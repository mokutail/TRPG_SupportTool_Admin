document.addEventListener("DOMContentLoaded", () => {
    renderDashboard();
    setupImport();
});

function renderDashboard() {
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) return;
    dashboard.innerHTML = "";
    
    const chars = JSON.parse(localStorage.getItem('characters') || '[]');

    chars.forEach((char, index) => {
        const card = document.createElement("div");
        card.className = "char-card";
        
        // カード全体をクリックで閲覧画面へ
        card.setAttribute('onclick', `if(!event.target.closest('.menu-container')){ viewChar(${index}); }`);
        
        card.innerHTML = `
            <div class="char-header">
                <h3>${char.name || "無名の探索者"}</h3>
                <div class="menu-container">
                    <button class="btn-menu" onclick="toggleMenu(this)">⋮</button>
                    <div class="menu-dropdown">
                        <button onclick="viewChar(${index})">閲覧</button>
                        <button onclick="editChar(${index})">詳細編集</button>
                        <button onclick="openModal(${index})">ココフォリア出力</button>
                        <button onclick="shareChar(${index})">共有（URLコピー）</button>
                        <button onclick="deleteChar(${index})" style="color:#ff4d4d;">削除</button>
                    </div>
                </div>
            </div>
        `;
        dashboard.appendChild(card);
    });
}

// ----------------------------------------
// データインポート機能（クリック・D&D・Ctrl+V）
// ----------------------------------------
function setupImport() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    if (!dropZone || !fileInput) return;

    // ★クリックでフォルダ（ファイル選択）を開く
    dropZone.addEventListener('click', () => fileInput.click());

    // 選択されたファイルを読み込む
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => processImportData(event.target.result);
        reader.readAsText(file);
        fileInput.value = ''; // 連続で同じファイルを読めるようにリセット
    });

    // Ctrl+V での貼り付け対応
    document.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        if(pasteData) processImportData(pasteData);
    });

    // ドラッグ＆ドロップ対応
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if(e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (event) => processImportData(event.target.result);
            reader.readAsText(file);
        } else {
            processImportData(e.dataTransfer.getData('text'));
        }
    });
}

function processImportData(text) {
    let parsedData = parseCCfolia(text) || parseIachara(text);
    if (parsedData) {
        let chars = JSON.parse(localStorage.getItem('characters') || '[]');
        chars.push(parsedData);
        localStorage.setItem('characters', JSON.stringify(chars));
        renderDashboard();
        alert(`${parsedData.name} をインポートしました！詳細編集から確認できます。`);
    } else {
        alert("対応していないデータ形式です。");
    }
}

// 名前とふりがなの分離
function parseNameAndFurigana(rawName) {
    const match = rawName.match(/^(.*?)\s*[（(](.*?)[）)]\s*$/);
    if (match) return { name: match[1].trim(), furigana: match[2].trim() };
    return { name: rawName.trim(), furigana: "" };
}

// ココフォリアJSON解析
function parseCCfolia(str) {
    try {
        const obj = JSON.parse(str);
        if (obj.kind !== 'character') return null;
        const d = obj.data;
        const nameData = parseNameAndFurigana(d.name || "無名の探索者");
        const char = { name: nameData.name, "char-name-new": nameData.name, "char-furigana": nameData.furigana };
        if (d.params) d.params.forEach(p => { char['base-' + p.label] = p.value; });
        if (d.commands) {
            const cmdRegex = /CCB<=(\d+)\s*【(.*?)】/g;
            let match;
            while ((match = cmdRegex.exec(d.commands)) !== null) {
                let total = parseInt(match[1]);
                let skillName = match[2].replace(/（.*?）|\(.*?\)/g, "").trim();
                if (skillName === 'クトゥルフ神話') char['skill-mythos'] = total;
                else char[`sk-oth-${skillName}`] = total; 
            }
        }
        return char;
    } catch(e) { return null; }
}

// ★いあきゃらテキスト解析（改行バグ修正 ＆ 表形式の技能読み込み）
function parseIachara(str) {
    if (!str.includes("名前:")) return null; 
    const char = {};

    // ★修正：改行をまたがないように [ \t]* を使用して抽出
    function extractVal(label) {
        const regex = new RegExp(`${label}:[ \\t]*([^/\\r\\n]*)`);
        const match = str.match(regex);
        return match ? match[1].trim() : "";
    }
    // script.js の parseIachara 内に追記する場合の例：
    const iconMatch = str.match(/【アイコン】[\s\n]*:(https?:\/\/[^\s\n]+)/);
    if(iconMatch) char.iconUrl = iconMatch[1];

    const rawName = extractVal("名前") || "無名の探索者";
    const nameData = parseNameAndFurigana(rawName);
    char.name = nameData.name;
    char["char-name-new"] = nameData.name;
    char["char-furigana"] = nameData.furigana;

    char["char-job"] = extractVal("職業");
    char["char-tag"] = extractVal("タグ");
    char["char-age"] = extractVal("年齢");
    char["char-gender"] = extractVal("性別");
    char["char-height"] = extractVal("身長");
    char["char-weight"] = extractVal("体重");
    char["char-origin"] = extractVal("出身");
    char["char-hair"] = extractVal("髪の色");
    char["char-eyes"] = extractVal("瞳の色");
    char["char-skin"] = extractVal("肌の色");

    // 能力値抽出
    const stats = ['STR','CON','POW','DEX','APP','SIZ','INT','EDU'];
    stats.forEach(st => {
        const reg = new RegExp(`${st}\\s+\\d+\\s+(\\d+)`);
        const match = str.match(reg);
        if(match) char['base-'+st] = match[1];
    });

    // ★修正：表形式（テーブル）になっている技能値を直接解析
    // 形式: 技能名 合計 初期値 職業P 興味P 成長分 その他
    const skillRegex = /^(.+?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)$/gm;
    let match;
    while ((match = skillRegex.exec(str)) !== null) {
        let rawSkillName = match[1].trim();
        // 見出し行をスキップ
        if (rawSkillName === "技能名" || rawSkillName.includes("ポイント")) continue;
        
        let skillName = rawSkillName.replace(/（.*?）|\(.*?\)/g, "").trim();
        let jobP = parseInt(match[4], 10);
        let intP = parseInt(match[5], 10);
        let groP = parseInt(match[6], 10);
        let othP = parseInt(match[7], 10);

        if (skillName === 'クトゥルフ神話') {
            if (groP > 0 || othP > 0) char['skill-mythos'] = groP + othP;
        } else {
            if (jobP > 0) char[`sk-job-${skillName}`] = jobP;
            if (intP > 0) char[`sk-int-${skillName}`] = intP;
            if (groP > 0) char[`sk-gro-${skillName}`] = groP;
            if (othP > 0) char[`sk-oth-${skillName}`] = othP;
        }
    }

    return char;
}

// ----------------------------------------
// 既存UI制御
// ----------------------------------------
function toggleMenu(btn) {
    document.querySelectorAll('.menu-dropdown').forEach(m => m.style.display = 'none');
    btn.nextElementSibling.style.display = 'block';
}
window.onclick = (e) => {
    if (!e.target.matches('.btn-menu')) {
        document.querySelectorAll('.menu-dropdown').forEach(m => m.style.display = 'none');
    }
};

function viewChar(index) { localStorage.setItem('viewingIndex', index); window.location.href = 'view.html'; }
function editChar(index) { localStorage.setItem('editingIndex', index); window.location.href = 'coc6th_editor/coc6th_edit.html'; }
function deleteChar(index) {
    if(!confirm("本当に削除しますか？")) return;
    let chars = JSON.parse(localStorage.getItem('characters') || '[]');
    chars.splice(index, 1);
    localStorage.setItem('characters', JSON.stringify(chars));
    renderDashboard();
}
function shareChar(index) {
    const shareUrl = window.location.origin + window.location.pathname + "?char=" + index;
    navigator.clipboard.writeText(shareUrl);
    alert("共有用URLをコピーしました！");
}

let currentIdx = null;
function openModal(index) { currentIdx = index; document.getElementById('export-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('export-modal').style.display = 'none'; }
function executeExport(type) {
    const chars = JSON.parse(localStorage.getItem('characters') || '[]');
    const char = chars[currentIdx];
    navigator.clipboard.writeText(type === 'json' ? JSON.stringify(char, null, 2) : JSON.stringify({name: char.name}));
    alert("コピーしました");
    closeModal();
}