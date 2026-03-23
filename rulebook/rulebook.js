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

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ★ ログインチェックと【管理者権限】の確認
    // ==========================================
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                // ユーザーの権限データを取得
                const userDoc = await db.collection("users").doc(user.uid).get();
                const userData = userDoc.exists ? userDoc.data() : {};
                const usedPass = userData.usedPassword || "";

                // ★ "admin2003" でログインしているかチェック！
                if (usedPass === "admin2003" || usedPass.includes("admin")) {
                    currentUser = user;
                    document.getElementById('rulebook-view').style.display = 'block';
                    loadRules(); // データを読み込む
                } else {
                    // admin以外は弾き返す
                    alert("⚠️ このツールは管理者専用です。");
                    window.location.href = '../index.html';
                }
            } catch (error) {
                console.error("権限チェックエラー:", error);
                window.location.href = '../index.html';
            }
        } else {
            alert("ログインが必要です。");
            window.location.href = '../index.html';
        }
    });

    // ==========================================
    // UIとデータベースの処理
    // ==========================================
    const inputFormArea = document.getElementById('input-form-area');
    const rulesList = document.getElementById('rules-list');
    const toggleEditBtn = document.getElementById('toggleEditMode');
    const searchInput = document.getElementById('search-input');

   // 編集モード切り替え
    const toggleBtn = document.getElementById('toggle-edit-btn');
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
        }
        displayRules(allRules); // 削除ボタンの表示/非表示を切り替えるため再描画
    });
    
    // データの保存
    document.getElementById('save-btn').addEventListener('click', async () => {
        const title = document.getElementById('rule-title').value.trim();
        const category = document.getElementById('rule-category').value.trim();
        const content = document.getElementById('rule-content').value.trim();

        if (!title || !content) {
            alert('タイトルと内容は必須です！');
            return;
        }

        try {
            // 管理者専用のコレクション "admin_rules" に保存
            await db.collection("admin_rules").add({
                title: title,
                category: category,
                content: content,
                createdAt: Date.now()
            });
            alert('保存しました！');
            document.getElementById('rule-title').value = '';
            document.getElementById('rule-category').value = '';
            document.getElementById('rule-content').value = '';
            loadRules();
        } catch (e) {
            console.error("保存エラー: ", e);
            alert('保存に失敗しました');
        }
    });

    // データの読み込み
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

    // 画面への描画
    function displayRules(rulesToDisplay) {
        rulesList.innerHTML = '';
        if (rulesToDisplay.length === 0) {
            rulesList.innerHTML = '<div class="empty-message-box">データがありません</div>';
            return;
        }

        rulesToDisplay.forEach(rule => {
            const card = document.createElement('div');
            card.className = 'rule-card';
            
            const formattedContent = rule.content.replace(/\n/g, '<br>');
            const deleteBtnHtml = isEditMode ? `<button class="delete-btn" onclick="deleteRule('${rule.id}')">削除</button>` : '';

            card.innerHTML = `
                ${deleteBtnHtml}
                <div class="rule-category">${rule.category || '未分類'}</div>
                <div class="rule-title">${rule.title}</div>
                <div class="rule-content">${formattedContent}</div>
            `;
            rulesList.appendChild(card);
        });
    }

    // 検索機能
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filteredRules = allRules.filter(rule => {
            return rule.title.toLowerCase().includes(keyword) || 
                   rule.content.toLowerCase().includes(keyword) ||
                   (rule.category && rule.category.toLowerCase().includes(keyword));
        });
        displayRules(filteredRules);
    });

    // 削除機能
    window.deleteRule = async (id) => {
        if (confirm('このルールを削除しますか？')) {
            try {
                await db.collection("admin_rules").doc(id).delete();
            } catch (e) {
                alert('削除に失敗しました');
            }
        }
    };
});