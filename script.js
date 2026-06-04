document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.getElementById("dashboard");
    
    // localStorageからキャラクターデータを取得
    const chars = JSON.parse(localStorage.getItem('characters') || '[]');

    if (chars.length === 0) {
        dashboard.innerHTML = "<p style='text-align:center; color:#888;'>まだキャラクターがいません。「新規作成」から作成してください。</p>";
        return;
    }

    // キャラクターカードを生成
    chars.forEach((char, index) => {
        const card = document.createElement("div");
        card.className = "char-card";
        card.innerHTML = `
            <div class="char-header">
                <h3>${char.name || "無名の探索者"}</h3>
            </div>
            <div class="actions">
                <button class="btn-copy" onclick="openModal(${index})">ココフォリア出力</button>
                <button class="btn-edit" onclick="editChar(${index})">詳細編集</button>
            </div>
        `;
        dashboard.appendChild(card);
    });
});

// --- 出力用モーダル制御 ---
let currentIdx = null;

function openModal(index) {
    currentIdx = index;
    const modal = document.getElementById('export-modal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('export-modal');
    if (modal) modal.style.display = 'none';
}

function executeExport(type) {
    const chars = JSON.parse(localStorage.getItem('characters') || '[]');
    const char = chars[currentIdx];

    if (!char) return;

    if (type === 'cocofolia') {
        // ココフォリア用データ生成ロジック
        const exportData = JSON.stringify({
            name: char.name,
            memo: "キャラクターデータ"
        });
        navigator.clipboard.writeText(exportData);
        alert("ココフォリア形式でコピーしました！");
    } else {
        // JSON形式
        const exportData = JSON.stringify(char, null, 2);
        navigator.clipboard.writeText(exportData);
        alert("JSON形式でコピーしました！");
    }
    closeModal();
}

// --- 詳細編集ボタンの処理 ---
function editChar(index) {
    // 編集対象のインデックスを記録してエディタへ遷移
    localStorage.setItem('editingIndex', index);
    window.location.href = 'coc6th_editor/coc6th_edit.html';
}

function saveCharacter() {
    const chars = JSON.parse(localStorage.getItem('characters') || '[]');
    const editIndex = localStorage.getItem('editingIndex');
    
    // 現在の画面の入力内容を取得してオブジェクトにまとめる（既存の処理）
    const newData = {
        name: document.getElementById("char-name-new").value,
        // 他の項目もここに追加...
    };

    if (editIndex !== null) {
        // --- 修正箇所: 編集モードならその場所を上書き ---
        chars[parseInt(editIndex)] = newData;
        localStorage.removeItem('editingIndex'); // 使い終わったら解除
    } else {
        // --- 新規作成なら末尾に追加 ---
        chars.push(newData);
    }

    localStorage.setItem('characters', JSON.stringify(chars));
    alert("保存しました！");
    window.location.href = "../index.html"; // 玄関に戻る
}