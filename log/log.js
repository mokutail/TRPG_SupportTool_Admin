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
let currentParsedData = {}; 
let savedLogs = []; 
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    // ★ ログインチェックとリアルタイム同期
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            db.collection("users").doc(currentUser.uid).collection("logs")
              .orderBy("createdAt", "desc")
              .onSnapshot((snapshot) => {
                  savedLogs = [];
                  snapshot.forEach((doc) => { savedLogs.push({ id: doc.id, ...doc.data() }); });
                  renderSavedLogs();
              });
        } else {
            alert("ログインが必要です");
            window.location.href = '../index.html';
        }
    });

    // --- タブ切り替え ---
    const tabAnalyzeBtn = document.getElementById('tabAnalyzeBtn');
    const tabSavedBtn = document.getElementById('tabSavedBtn');
    const viewAnalyze = document.getElementById('viewAnalyze');
    const viewSaved = document.getElementById('viewSaved');

    tabAnalyzeBtn.onclick = () => {
        tabAnalyzeBtn.classList.add('active'); tabSavedBtn.classList.remove('active');
        viewAnalyze.style.display = 'block'; viewSaved.style.display = 'none';
    };
    tabSavedBtn.onclick = () => {
        tabSavedBtn.classList.add('active'); tabAnalyzeBtn.classList.remove('active');
        viewSaved.style.display = 'block'; viewAnalyze.style.display = 'none';
    };

    // --- 詳細画面のフィルターボタン ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderParsedResult(currentParsedData);
        });
    });

    // --- 保存済み一覧の検索フィルター ---
    document.getElementById('filterLogTitle').addEventListener('input', renderSavedLogs);
    document.getElementById('filterLogChar').addEventListener('input', renderSavedLogs);

    // ==========================================
    // ★ ログの読み込みと解析処理
    // ==========================================
    const logFileInput = document.getElementById('logFileInput');
    const dropZone = document.getElementById('dropZone');

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) processFile(e.dataTransfer.files[0]);
    });

    logFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) processFile(e.target.files[0]);
    });

    function processFile(file) {
        if (!file.name.endsWith('.html')) return alert("ココフォリアのHTMLログファイルを選択してください！");
        
        let defaultTitle = file.name.replace('.html', '').replace('[main]', '').trim();
        document.getElementById('saveLogTitle').value = defaultTitle;

        const reader = new FileReader();
        reader.onload = (e) => {
            const htmlText = e.target.result;
            parseCocofoliaHTML(htmlText);
        };
        reader.readAsText(file);
    }

    function parseCocofoliaHTML(htmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const paragraphs = doc.querySelectorAll('p');
        
        currentParsedData = {};

        paragraphs.forEach(p => {
            const spans = p.querySelectorAll('span');
            if (spans.length >= 3) {
                const charName = spans[1].innerText.trim();
                const logText = spans[2].innerText.trim();
                
                let type = null;
                if (logText.includes('決定的成功') || logText.includes('クリティカル')) type = 'critical';
                else if (logText.includes('致命的失敗') || logText.includes('ファンブル')) type = 'fumble';
                else if (logText.includes('スペシャル')) type = 'special';
                else if (logText.includes('成功')) type = 'success';
                else if (logText.includes('失敗')) type = 'failure';
                
                if (type) {
                    let rollValue = '?';
                    const match = logText.match(/＞\s*(\d+)\s*＞/);
                    if (match) {
                        rollValue = match[1];
                    } else {
                        const matchEnd = logText.match(/＞\s*(\d+)\s*$/);
                        if(matchEnd) rollValue = matchEnd[1];
                    }

                    if (!currentParsedData[charName]) currentParsedData[charName] = [];
                    currentParsedData[charName].push({ text: logText, type: type, val: rollValue });
                }
            }
        });

        if (Object.keys(currentParsedData).length === 0) {
            alert("抽出できるダイスロールが見つかりませんでした。");
            return;
        }

        document.getElementById('analyzeResultArea').style.display = 'block';
        currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        renderParsedResult(currentParsedData);
    }

    // --- ★ 解析結果の描画（アコーディオン化） ---
    function renderParsedResult(dataObj, containerId = 'parsedListContainer') {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        let hasDisplayedAny = false;

        for (const charName in dataObj) {
            const charAllLogs = dataObj[charName];
            const displayLogs = charAllLogs.filter(log => currentFilter === 'all' || log.type === currentFilter);
            
            const total = charAllLogs.length;
            let cCount = 0, fCount = 0;
            charAllLogs.forEach(l => {
                if(l.type === 'critical') cCount++;
                if(l.type === 'fumble') fCount++;
            });
            const cPer = total > 0 ? ((cCount / total) * 100).toFixed(1) : 0;
            const fPer = total > 0 ? ((fCount / total) * 100).toFixed(1) : 0;

            if (displayLogs.length > 0) {
                hasDisplayedAny = true;
                
                // ★ details タグを使って開閉（しまう）機能を追加！
                const charBox = document.createElement('details');
                charBox.className = 'log-char-accordion';
                charBox.open = true; // デフォルトは開いておく
                
                charBox.innerHTML = `
                    <summary class="log-char-summary">
                        <div class="log-char-header-top">
                            <div class="log-char-title">${charName}</div>
                            <div class="log-char-toggle-icon">▼</div>
                        </div>
                        <div class="log-char-stats">
                            <span style="background:#eee; padding:2px 8px; border-radius:10px;">🎲 ${total}回</span>
                            <span style="color:#0277bd; background:#E1F5FE; padding:2px 8px; border-radius:10px;">✨クリ ${cCount}回 (${cPer}%)</span>
                            <span style="color:#c62828; background:#FFEBEE; padding:2px 8px; border-radius:10px;">💀ファン ${fCount}回 (${fPer}%)</span>
                        </div>
                    </summary>
                    <div class="log-char-content"></div>
                `;
                
                const contentDiv = charBox.querySelector('.log-char-content');
                
                displayLogs.forEach(log => {
                    let typeLabel = log.type.toUpperCase();
                    if (log.type === 'critical') typeLabel = 'Critical';
                    if (log.type === 'fumble') typeLabel = 'Fumble';
                    if (log.type === 'special') typeLabel = 'Special';
                    if (log.type === 'success') typeLabel = 'Success';
                    if (log.type === 'failure') typeLabel = 'Failure';

                    const item = document.createElement('div');
                    item.className = `log-item ${log.type}`;
                    item.innerHTML = `
                        <div class="log-item-content">
                            <span class="log-type-label">${typeLabel}</span>
                            <span>${log.text}</span>
                        </div>
                        <div class="roll-value-badge">${log.val}</div>
                    `;
                    contentDiv.appendChild(item);
                });
                
                container.appendChild(charBox);
            }
        }

        if (!hasDisplayedAny) {
            container.innerHTML = `<div style="text-align:center; color:#999; font-weight:bold; padding:20px;">該当するログがありません</div>`;
        }
    }

    // ==========================================
    // ★ 保存処理
    // ==========================================
    document.getElementById('btnSaveLog').addEventListener('click', () => {
        if (!currentUser) return;
        const title = document.getElementById('saveLogTitle').value.trim();
        if (!title) return alert('タイトルを入力してください！');

        const saveData = {
            title: title,
            parsedData: currentParsedData,
            createdAt: Date.now()
        };

        db.collection("users").doc(currentUser.uid).collection("logs").add(saveData).then(() => {
            alert('クラウドに保存しました！「保存済みログ」からいつでも見返せます！');
            tabSavedBtn.click();
        });
    });

    // ==========================================
    // ★ 保存済みリストの描画
    // ==========================================
    function renderSavedLogs() {
        const container = document.getElementById('savedLogList');
        container.innerHTML = '';

        const fTitle = document.getElementById('filterLogTitle').value.trim().toLowerCase();
        const fChar = document.getElementById('filterLogChar').value.trim().toLowerCase();

        let filteredLogs = savedLogs.filter(logDoc => {
            if (fTitle && !logDoc.title.toLowerCase().includes(fTitle)) return false;
            
            if (fChar) {
                const chars = Object.keys(logDoc.parsedData);
                const matchChar = chars.some(c => c.toLowerCase().includes(fChar));
                if (!matchChar) return false;
            }
            return true;
        });

        if (filteredLogs.length === 0) {
            container.innerHTML = '<div class="empty-message-box">該当する保存済みログはありません</div>';
            return;
        }

        filteredLogs.forEach(logDoc => {
            const div = document.createElement('div');
            div.className = 'saved-list-item';
            
            const dateStr = new Date(logDoc.createdAt).toLocaleDateString('ja-JP');
            
            let totalRolls = 0;
            let cCount = 0;
            let fCount = 0;

            Object.values(logDoc.parsedData).forEach(logs => {
                totalRolls += logs.length;
                logs.forEach(l => {
                    if (l.type === 'critical') cCount++;
                    if (l.type === 'fumble') fCount++;
                });
            });

            div.innerHTML = `
                <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 6px;">
                    <button class="corner-btn delete" style="background: #ffebee; color: #d32f2f; border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer;" onclick="deleteLog('${logDoc.id}', event)">削除</button>
                </div>
                <div style="font-size:12px; color:#888; font-weight:bold; margin-bottom:6px;">${dateStr}</div>
                <div style="font-size:18px; font-weight:bold; color:#333; margin-bottom:12px; line-height:1.3; padding-right:60px;">${logDoc.title}</div>
                
                <div style="font-size:13px; font-weight:bold; display:flex; gap:10px; flex-wrap:wrap;">
                    <span style="color:#555; background:#f5f5f5; padding:4px 10px; border-radius:12px;">🎲 ${totalRolls}件</span>
                    <span style="color:#0277bd; background:#E1F5FE; padding:4px 10px; border-radius:12px;">✨クリ ${cCount}回</span>
                    <span style="color:#c62828; background:#FFEBEE; padding:4px 10px; border-radius:12px;">💀ファン ${fCount}回</span>
                </div>
            `;

            div.addEventListener('click', () => {
                currentParsedData = logDoc.parsedData;
                document.getElementById('saveLogTitle').value = logDoc.title;
                document.getElementById('analyzeResultArea').style.display = 'block';
                document.getElementById('btnSaveLog').style.display = 'none'; 
                tabAnalyzeBtn.click(); 
                
                currentFilter = 'all';
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                renderParsedResult(currentParsedData);
            });

            container.appendChild(div);
        });
    }

    window.deleteLog = (id, event) => {
        event.stopPropagation();
        if (confirm('この保存済みログを削除しますか？')) {
            db.collection("users").doc(currentUser.uid).collection("logs").doc(id).delete();
        }
    };
});