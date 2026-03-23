// ==========================================
// ★ Firebaseの初期設定
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyD67HN29lVqUoRAczK-FYFdqlkQq7PyfTU",
    authDomain: "trpg-supporttool.firebaseapp.com",
    projectId: "trpg-supporttool",
    storageBucket: "trpg-supporttool.firebasestorage.app",
    messagingSenderId: "163289928352",
    appId: "1:163289928352:web:a75c5bb1827b47d0eb2fc5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let allRules = [];
let isEditMode = false;
let userRole = "none";
let editingRuleId = null; 
let activeTagFilter = null; // ★追加：現在絞り込んでいるタグを記憶

document.addEventListener('DOMContentLoaded', () => {
    // ログイン＆権限チェック
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userDoc = await db.collection("users").doc(user.uid).get();
                const usedPass = userDoc.exists ? (userDoc.data().usedPassword || "") : "";
                const passDoc = await db.collection("valid_passwords").doc(usedPass).get();
                if (passDoc.exists) userRole = passDoc.data().role || "";

                if (userRole === "admin" || userRole === "friend") {
                    currentUser = user;
                    document.getElementById('rulebook-view').style.display = 'block';
                    if (userRole === "friend") {
                        const toggleBtn = document.getElementById('toggle-edit-btn');
                        if(toggleBtn) toggleBtn.style.display = 'none';
                    }
                    loadRules();
                } else {
                    alert("⚠️ アクセス権がありません。");
                    window.location.href = '../index.html';
                }
            } catch (error) {
                console.error("権限エラー:", error);
                window.location.href = '../index.html';
            }
        } else {
            alert("ログインが必要です。");
            window.location.href = '../index.html';
        }
    });

    const inputFormArea = document.getElementById('input-form-area');
    const rulesList = document.getElementById('rules-list');
    const toggleBtn = document.getElementById('toggle-edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const formTitle = document.getElementById('form-title');
    const tableContainer = document.getElementById('table-rows-container');
    const addTableRowBtn = document.getElementById('add-table-row-btn');
    const isSecretCheckbox = document.getElementById('rule-is-secret');

    function addTableRowUI(col1 = "", col2 = "") {
        if (!tableContainer) return;
        const rowDiv = document.createElement('div');
        rowDiv.className = 'table-row-input';
        rowDiv.innerHTML = `
            <input type="text" class="form-input table-col-1" placeholder="左の列 (例: 1-2)" value="${col1}" style="flex:1;">
            <input type="text" class="form-input table-col-2" placeholder="右の列 (例: 健忘症)" value="${col2}" style="flex:3;">
            <button class="add-row-btn" style="color:#d32f2f; border-color:#d32f2f;" onclick="this.parentElement.remove()">消</button>
        `;
        tableContainer.appendChild(rowDiv);
    }

    if(addTableRowBtn) {
        addTableRowBtn.addEventListener('click', () => addTableRowUI());
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isEditMode = !isEditMode;
            if (isEditMode) {
                inputFormArea.classList.remove('hidden');
                toggleBtn.classList.add('active');
                toggleBtn.innerHTML = "🔒 編集を終了";
            } else {
                inputFormArea.classList.add('hidden');
                toggleBtn.classList.remove('active');
                toggleBtn.innerHTML = "🔓 編集モード";
                resetForm(); 
            }
            displayRules(allRules);
        });
    }

    function resetForm() {
        editingRuleId = null;
        formTitle.innerText = "✏️ 新しいルールを登録";
        saveBtn.innerText = "💾 保存する";
        saveBtn.style.backgroundColor = "#76ADAF";
        cancelEditBtn.style.display = "none";
        
        document.getElementById('rule-title').value = '';
        document.getElementById('rule-tags').value = '';
        document.getElementById('rule-book').value = '';
        document.getElementById('rule-page').value = '';
        document.getElementById('rule-content').value = '';
        if(isSecretCheckbox) isSecretCheckbox.checked = false;
        if(tableContainer) tableContainer.innerHTML = ''; 
    }

    if(cancelEditBtn) cancelEditBtn.addEventListener('click', resetForm);

    if(saveBtn) {
        saveBtn.addEventListener('click', async () => {
            try {
                const title = document.getElementById('rule-title').value.trim();
                const tagsStr = document.getElementById('rule-tags').value.trim();
                const book = document.getElementById('rule-book').value.trim();
                const page = document.getElementById('rule-page').value.trim();
                const content = document.getElementById('rule-content').value.trim();
                const isSecret = isSecretCheckbox ? isSecretCheckbox.checked : false;

                if (!title || !content) {
                    alert('タイトルと内容は必須です！');
                    return;
                }

                // ★追加：「,」だけでなく、全角の「、」や「，」でも分割できるように正規表現を使用
                const tagsArray = tagsStr ? tagsStr.split(/[,、，]/).map(t => t.trim()).filter(t => t !== "") : [];

                const tableData = [];
                if (tableContainer) {
                    const tableRows = tableContainer.querySelectorAll('.table-row-input');
                    tableRows.forEach(row => {
                        const col1 = row.querySelector('.table-col-1').value.trim();
                        const col2 = row.querySelector('.table-col-2').value.trim();
                        if(col1 || col2) tableData.push({ col1, col2 });
                    });
                }

                const ruleData = {
                    title: title,
                    tags: tagsArray,
                    book: book,
                    page: page,
                    content: content,
                    table: tableData,
                    isSecret: isSecret,
                    updatedAt: Date.now() 
                };

                if (editingRuleId) {
                    await db.collection("admin_rules").doc(editingRuleId).update(ruleData);
                    alert('✅ 修正を保存しました！');
                } else {
                    ruleData.createdAt = Date.now();
                    await db.collection("admin_rules").add(ruleData);
                    alert('✅ 新しいルールを保存しました！');
                }
                resetForm();

            } catch (e) {
                console.error("保存エラー詳細: ", e);
                alert('❌ エラーが発生しました。\n詳細: ' + e.message);
            }
        });
    }

    function loadRules() {
        rulesList.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">読み込み中...</div>';
        db.collection("admin_rules").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            allRules = [];
            snapshot.forEach((doc) => {
                allRules.push({ id: doc.id, ...doc.data() });
            });
            displayRules(allRules); // Firebaseからデータが来るたびに描画
        });
    }

    // ★タグフィルターのUI更新関数
    function updateFilterUI() {
        const filterContainer = document.getElementById('active-filter-container');
        if (!filterContainer) return;
        
        if (activeTagFilter) {
            filterContainer.innerHTML = `
                <div class="filter-badge">
                    🏷️ #${activeTagFilter} で絞り込み中
                    <span class="filter-clear" onclick="clearTagFilter()">×</span>
                </div>
            `;
        } else {
            filterContainer.innerHTML = '';
        }
    }

    // ★一覧描画関数
    window.displayRules = function(rulesToDisplay) {
        rulesList.innerHTML = '';
        updateFilterUI();
        
        // 1. 権限による除外（KP非公開設定）
        let visibleRules = rulesToDisplay.filter(rule => {
            if (rule.isSecret === true && userRole !== "admin") return false; 
            return true;
        });

        // 2. タグによる絞り込み
        if (activeTagFilter) {
            visibleRules = visibleRules.filter(rule => rule.tags && rule.tags.includes(activeTagFilter));
        }

        if (visibleRules.length === 0) {
            rulesList.innerHTML = '<div class="empty-message-box">データがありません</div>';
            return;
        }

        visibleRules.forEach(rule => {
            const card = document.createElement('div');
            card.className = 'rule-card';
            // ★カード全体をクリック可能にし、詳細を開くイベントをセット
            card.setAttribute('onclick', `toggleDetails('${rule.id}')`);
            
            let actionHtml = '';
            if (userRole === "admin" && isEditMode) {
                // event.stopPropagation() で、ボタンを押した時にカードが開閉してしまうのを防ぐ
                actionHtml = `
                    <div class="card-actions">
                        <button class="edit-btn" onclick="editRule('${rule.id}'); event.stopPropagation();">✏️ 修正</button>
                        <button class="delete-btn" onclick="deleteRule('${rule.id}'); event.stopPropagation();">🗑️ 削除</button>
                    </div>
                `;
            }

            let secretBadgeHtml = rule.isSecret ? `<span class="secret-badge">🔒 非公開（KPのみ）</span>` : '';
            
            let tagsHtml = '';
            if (rule.tags && rule.tags.length > 0) {
                // タグをクリックした時もカードが開かないように event.stopPropagation() を設定
                const tagsList = rule.tags.map(t => `<span class="rule-tag" onclick="filterByTag('${t}', event)">#${t}</span>`).join('');
                tagsHtml = `<div class="tag-container">${secretBadgeHtml}${tagsList}</div>`;
            } else if (rule.isSecret) {
                tagsHtml = `<div class="tag-container">${secretBadgeHtml}</div>`;
            }

            let sourceHtml = '';
            if (rule.book || rule.page) {
                const bookText = rule.book ? `📖 ${rule.book}` : '';
                const pageText = rule.page ? ` (${rule.page})` : '';
                sourceHtml = `<div class="rule-source">${bookText}${pageText}</div>`;
            }

            const formattedContent = rule.content.replace(/\n/g, '<br>');

            let tableHtml = '';
            if (rule.table && rule.table.length > 0) {
                const trs = rule.table.map(row => `<tr><td>${row.col1}</td><td>${row.col2}</td></tr>`).join('');
                tableHtml = `
                    <table class="rule-table">
                        <thead><tr><th>ダイス / 条件</th><th>結果 / 内容</th></tr></thead>
                        <tbody>${trs}</tbody>
                    </table>
                `;
            }

            // ★構造変更：最初はタイトルとタグだけ見せて、詳細は「rule-details」の中に隠す
            card.innerHTML = `
                ${actionHtml}
                <div class="toggle-icon" id="icon-${rule.id}">▼</div>
                ${sourceHtml}
                ${tagsHtml}
                <div class="rule-title">${rule.title}</div>
                
                <div id="details-${rule.id}" class="rule-details">
                    <div class="rule-content">${formattedContent}</div>
                    ${tableHtml}
                </div>
            `;
            rulesList.appendChild(card);
        });
    };

    // ==========================================
    // グローバル関数（クリックイベント用）
    // ==========================================

    // ★タグで絞り込む関数
    window.filterByTag = (tag, event) => {
        if (event) event.stopPropagation(); // カードを開閉させない
        activeTagFilter = tag;
        displayRules(allRules);
    };

    // ★絞り込みを解除する関数
    window.clearTagFilter = () => {
        activeTagFilter = null;
        displayRules(allRules);
    };

    // ★詳細の開閉（アコーディオン）関数
    window.toggleDetails = (id) => {
        const details = document.getElementById(`details-${id}`);
        const icon = document.getElementById(`icon-${id}`);
        if (!details || !icon) return;

        if (details.style.display === 'block') {
            details.style.display = 'none';
            icon.innerText = '▼';
            icon.style.transform = 'rotate(0deg)';
        } else {
            details.style.display = 'block';
            icon.innerText = '▲';
        }
    };

    window.deleteRule = async (id) => {
        if (userRole !== "admin") return;
        if (confirm('このルールを本当に削除しますか？')) {
            try {
                await db.collection("admin_rules").doc(id).delete();
            } catch (e) {
                alert('削除に失敗しました');
            }
        }
    };

    window.editRule = (id) => {
        if (userRole !== "admin") return;
        const rule = allRules.find(r => r.id === id);
        if (!rule) return;

        editingRuleId = id;
        formTitle.innerText = `✏️ 「${rule.title}」を修正中...`;
        saveBtn.innerText = "💾 上書き保存する";
        saveBtn.style.backgroundColor = "#f57c00"; 
        cancelEditBtn.style.display = "inline-block";
        
        document.getElementById('rule-title').value = rule.title || "";
        document.getElementById('rule-tags').value = rule.tags ? rule.tags.join(', ') : ""; // 修正時はカンマで表示
        document.getElementById('rule-book').value = rule.book || "";
        document.getElementById('rule-page').value = rule.page || "";
        document.getElementById('rule-content').value = rule.content || "";
        if(isSecretCheckbox) isSecretCheckbox.checked = rule.isSecret || false; 

        if (tableContainer) {
            tableContainer.innerHTML = '';
            if (rule.table && rule.table.length > 0) {
                rule.table.forEach(row => addTableRowUI(row.col1, row.col2));
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            // 検索ワードで先に絞り込む
            const filteredRules = allRules.filter(rule => {
                const searchStr = `
                    ${rule.title} 
                    ${rule.content} 
                    ${rule.tags ? rule.tags.join(' ') : ''} 
                    ${rule.book || ''}
                `.toLowerCase();
                return searchStr.includes(keyword);
            });
            // その絞り込まれた結果を、さらにタグフィルターにかけて表示
            displayRules(filteredRules);
        });
    }
});