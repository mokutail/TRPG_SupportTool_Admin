window.charMainImages = window.charMainImages || [];
window.charExprImages = window.charExprImages || [];

const BASIC_INFO_COMPONENT = `
    <div class="info-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('base-info-area', this)">
            <h2 class="section-subtitle">基本情報</h2><span class="accordion-icon">⋁</span>
        </div>
        <div id="base-info-area" class="info-content-wrapper open">
            <div class="info-left-box">
                <div class="image-preview-placeholder" id="main-image-preview">
                    <span class="no-img-text">No Image</span>
                </div>
                <button type="button" class="btn-change-image" onclick="openImageModal()">🖊 画像の変更・追加</button>
            </div>
            <div class="info-right-box">
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">名前</span><input type="text" id="char-name-new"></div>
                    <div class="info-input-group"><span class="info-label">ふりがな</span><input type="text" id="char-furigana"></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">タグ</span><input type="text" id="char-tag"></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">職業</span><input type="text" id="char-job"></div>
                    <div class="info-input-group"><span class="info-label">年齢</span><input type="text" id="char-age"></div>
                    <div class="info-input-group"><span class="info-label">性別</span><input type="text" id="char-gender"></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">身長</span><input type="text" id="char-height"></div>
                    <div class="info-input-group"><span class="info-label">体重</span><input type="text" id="char-weight"></div>
                    <div class="info-input-group"><span class="info-label">出身</span><input type="text" id="char-origin"></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">髪の色</span><input type="text" id="char-hair"></div>
                    <div class="info-input-group"><span class="info-label">瞳の色</span><input type="text" id="char-eyes"></div>
                    <div class="info-input-group"><span class="info-label">肌の色</span><input type="text" id="char-skin"></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">誕生日</span><input type="text" id="char-birthday"></div>
                    <div class="info-input-group"><span class="info-label">種族</span><input type="text" id="char-race"></div>
                    <div class="info-input-group"><span class="info-label">最終学歴</span><input type="text" id="char-education"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="image-modal" class="image-modal" style="display:none;">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <h3>アイコン画像管理</h3>
                <button type="button" class="btn-close" onclick="closeImageModal()">✕</button>
            </div>
            <div id="image-rows-container">
                <div class="img-section-title">メイン画像 / 衣装差分</div>
                <div id="main-images-list"></div>
                <button type="button" class="btn-add-img-row" onclick="addImageRow('main')">+ メイン画像を追加</button>
                <div class="img-section-title" style="margin-top:20px;">表情差分 (丸アイコン)</div>
                <div id="expr-images-list"></div>
                <button type="button" class="btn-add-img-row" style="background:#5c6bc0;" onclick="addImageRow('expr')">+ 表情差分を追加</button>
            </div>
            <div class="image-modal-footer">
                <button type="button" class="btn-done" onclick="closeImageModal()">完了</button>
            </div>
        </div>
    </div>
`;
document.getElementById("component-info-value").innerHTML = BASIC_INFO_COMPONENT;

function openImageModal() { document.getElementById('image-modal').style.display = 'flex'; renderImageRows(); }
function closeImageModal() { document.getElementById('image-modal').style.display = 'none'; updateMainPreview(); }

function renderImageRows() {
    renderList('main-images-list', window.charMainImages, 'main');
    renderList('expr-images-list', window.charExprImages, 'expr');
}

function renderList(containerId, list, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    list.forEach((img, i) => {
        container.innerHTML += `
            <div class="image-row">
                <div class="img-preview-mini">${img.url ? `<img src="${img.url}">` : ''}</div>
                <input type="text" class="img-desc-input" placeholder="説明" value="${img.desc}" oninput="updateDesc('${type}', ${i}, this.value)">
                <label class="btn-change-file">変更<input type="file" style="display:none;" onchange="uploadImage('${type}', ${i}, this)" accept="image/*"></label>
                <div class="sort-btns">
                    <button type="button" onclick="moveImg('${type}', ${i}, -1)">▲</button>
                    <button type="button" onclick="moveImg('${type}', ${i}, 1)">▼</button>
                </div>
                <button type="button" class="btn-delete-img" onclick="deleteImageRow('${type}', ${i})">🗑</button>
            </div>
        `;
    });
}

function updateDesc(type, i, val) {
    if(type==='main') window.charMainImages[i].desc = val; else window.charExprImages[i].desc = val;
}
function addImageRow(type) {
    if(type==='main') window.charMainImages.push({url: '', desc: ''}); else window.charExprImages.push({url: '', desc: ''});
    renderImageRows();
}
function deleteImageRow(type, i) {
    if(type==='main') window.charMainImages.splice(i, 1); else window.charExprImages.splice(i, 1);
    renderImageRows();
}
function moveImg(type, i, dir) {
    const list = type === 'main' ? window.charMainImages : window.charExprImages;
    if (i + dir < 0 || i + dir >= list.length) return;
    const temp = list[i]; list[i] = list[i + dir]; list[i + dir] = temp;
    renderImageRows();
}
function uploadImage(type, i, input) {
    if(!input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // 画像を圧縮するためのキャンバスを作成
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // 最大サイズを指定（メインは800px、表情は400px程度に自動縮小）
            const MAX_SIZE = type === 'main' ? 800 : 400;
            
            if (width > height) {
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // 画質を少し落としてJPEG形式で超圧縮 (0.7は画質と軽さのベストバランス)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
            
            // 圧縮したデータを保存用配列にセット
            if(type === 'main') {
                window.charMainImages[i].url = compressedDataUrl;
            } else {
                window.charExprImages[i].url = compressedDataUrl;
            }
            renderImageRows();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}



function updateMainPreview() {
    const preview = document.getElementById('main-image-preview');
    if(!preview) return;
    if(window.charMainImages.length > 0 && window.charMainImages[0].url) {
        preview.innerHTML = `<img src="${window.charMainImages[0].url}" style="width:100%; height:100%; object-fit:contain;">`;
    } else {
        preview.innerHTML = '<span class="no-img-text">No Image</span>';
    }
}