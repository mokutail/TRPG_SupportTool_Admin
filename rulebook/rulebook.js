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

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ログイン＆権限チェック
    // ==========================================
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

    // ==========================================
    // UI要素の取得
    // ==========================================
    const inputFormArea = document.getElementById('input-form-area');
    const rulesList = document.getElementById('rules-list');
    const toggleBtn = document.getElementById('toggle-edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const formTitle = document.getElementById('form-title');
    const tableContainer = document.getElementById('table-rows-container');
    const addTableRowBtn = document.getElementById('add-table-row-btn');
    const isSecretCheckbox = document.getElementById('rule-is-secret'); // ★追加

    // ==========================================
    // 表（テーブル）のUI制御
    // ==========================================
    function addTableRowUI(col1 = "", col2 = "") {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'table-row-input';
        rowDiv.innerHTML = `
            <input type="text" class="form-input table-col-1" placeholder="左の列 (例: 1-2)" value="${col1}" style="flex:1;">
            <input type="text" class="form-input table-col-2" placeholder="右の列 (例: 健忘症)" value="${col2}" style="flex:3;">
            <button class="add-row-btn" style="color:#d32f2f; border-color:#d32f2f;" onclick="this.parentElement.remove()">消</button>
        `;
        tableContainer.appendChild(rowDiv);
    }

    addTableRowBtn.addEventListener('click', () => addTableRowUI());

    // ==========================================
    // 編集モード＆フォーム制御
    // ==========================================
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
        isSecretCheckbox.checked = false; // ★追加：チェックを外す
        tableContainer.innerHTML = ''; 
    }

    cancelEditBtn.addEventListener('click', resetForm);

    // ==========================================
    // データの保存 ＆ 更新
    // ==========================================
    saveBtn.addEventListener('click', async () => {
        const title = document.getElementById('rule-title').value.trim();
        const tagsStr = document.getElementById('rule-tags').value.trim();
        const book = document.getElementById('rule-book').value.trim();
        const page = document.getElementById('rule-page').value.trim();
        const content = document.getElementById('rule-content').value.trim();
        const isSecret = isSecretCheckbox.checked; // ★追加：チェック状態を取得

        if (!title || !content) {
            alert('タイトルと内容は必須です！');
            return;
        }

        const tagsArray = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t !== "") : [];

        const tableData = [];
        const tableRows = tableContainer.querySelectorAll('.table-row-input');
        tableRows.forEach(row => {
            const col1 = row.querySelector('.table-col-1').value.trim();
            const col2 = row.querySelector('.table-col-2').value.trim();
            if(col1 || col2) {
                tableData.push({ col1, col2 });
            }
        });

        const ruleData = {
            title: title,
            tags: tagsArray,
            book: book,
            page: page,
            content: content,
            table: tableData,
            isSecret: isSecret, // ★追加：データベースに保存
            updatedAt: Date.now() 
        };

        try {
            if (editingRuleId) {
                await db.collection("admin_rules").doc(editingRuleId).update(ruleData);
                alert('修正を保存しました！');
            } else {
                ruleData.createdAt = Date.now();
                await db.collection("admin_rules").add(ruleData);
                alert('新しいルールを保存しました！');
            }
            resetForm();
        } catch (e) {
            console.error("保存エラー: ", e);
            alert('保存に失敗しました');
        }
    });

    // ==========================================
    // データの読み込み ＆ 描画
    // ==========================================
    function loadRules() {
        rulesList.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">読み込み中...</div>';
        db.collection("admin_rules").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            allRules = [];
            snapshot.forEach((doc) => {
                allRules.push({ id: doc.id, ...doc.data() });
            });
            displayRules(allRules);
        });
    }

    function displayRules(rulesToDisplay) {
        rulesList.innerHTML = '';
        
        // ★ 核心部分：特別閲覧者（friend）には、isSecretがtrueのものを絶対に除外する
        const visibleRules = rulesToDisplay.filter(rule => {
            if (rule.isSecret === true && userRole !== "admin") {
                return false; 
            }
            return true;
        });

        if (visibleRules.length === 0) {
            rulesList.innerHTML = '<div class="empty-message-box">データがありません</div>';
            return;
        }

        visibleRules.forEach(rule => {
            const card = document.createElement('div');
            card.className = 'rule-card';
            
            let actionHtml = '';
            if (userRole === "admin" && isEditMode) {
                actionHtml = `
                    <div class="card-actions">
                        <button class="edit-btn" onclick="editRule('${rule.id}')">✏️ 修正</button>
                        <button class="delete-btn" onclick="deleteRule('${rule.id}')">🗑️ 削除</button>
                    </div>
                `;
            }

            let tagsHtml = '';
            // ★追加：非公開ルールの場合は、管理者の画面にのみ🔒バッジをつける
            let secretBadgeHtml = rule.isSecret ? `<span class="secret-badge">🔒 非公開（KPのみ）</span>` : '';
            
            if (rule.tags && rule.tags.length > 0) {
                const tagsList = rule.tags.map(t => `<span class="rule-tag">#${t}</span>`).join('');
                tagsHtml = `<div class="tag-container">${secretBadgeHtml}${tagsList}</div>`;
            } else if (rule.isSecret) {
                // タグがなくても非公開バッジだけは出す
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

            card.innerHTML = `
                ${actionHtml}
                ${sourceHtml}
                ${tagsHtml}
                <div class="rule-title">${rule.title}</div>
                <div class="rule-content">${formattedContent}</div>
                ${tableHtml}
            `;
            rulesList.appendChild(card);
        });
    }

    // ==========================================
    // グローバル関数（削除・修正）
    // ==========================================
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
        document.getElementById('rule-tags').value = rule.tags ? rule.tags.join(', ') : "";
        document.getElementById('rule-book').value = rule.book || "";
        document.getElementById('rule-page').value = rule.page || "";
        document.getElementById('rule-content').value = rule.content || "";
        isSecretCheckbox.checked = rule.isSecret || false; // ★追加：チェック状態を復元

        tableContainer.innerHTML = '';
        if (rule.table && rule.table.length > 0) {
            rule.table.forEach(row => addTableRowUI(row.col1, row.col2));
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filteredRules = allRules.filter(rule => {
                const searchStr = `
                    ${rule.title} 
                    ${rule.content} 
                    ${rule.tags ? rule.tags.join(' ') : ''} 
                    ${rule.book || ''}
                `.toLowerCase();
                return searchStr.includes(keyword);
            });
            displayRules(filteredRules);
        });
    }
});