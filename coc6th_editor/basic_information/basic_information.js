// ★basic_information.js の全文をこれに置き換えてください★
window.charImages = window.charImages || [];

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
                <div class="info-input-row flex-2">
                    <div class="info-input-group"><span class="info-label">名前</span><input type="text" id="char-name-new" placeholder="新たな探索者"></div>
                    <div class="info-input-group"><span class="info-label">ふりがな</span><input type="text" id="char-furigana" placeholder=""></div>
                </div>
                <div class="info-input-row">
                    <div class="info-input-group"><span class="info-label">タグ</span><input type="text" id="char-tag" placeholder=""></div>
                </div>
                <div class="info-input-row flex-3">
                    <div class="info-input-group"><span class="info-label">職業</span><input type="text" id="char-job" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">年齢</span><input type="text" id="char-age" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">性別</span><input type="text" id="char-gender" placeholder=""></div>
                </div>
                <div class="info-input-row flex-3">
                    <div class="info-input-group"><span class="info-label">身長</span><input type="text" id="char-height" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">体重</span><input type="text" id="char-weight" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">出身</span><input type="text" id="char-origin" placeholder=""></div>
                </div>
                <div class="info-input-row flex-3">
                    <div class="info-input-group"><span class="info-label">髪の色</span><input type="text" id="char-hair" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">瞳の色</span><input type="text" id="char-eyes" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">肌の色</span><input type="text" id="char-skin" placeholder=""></div>
                </div>
                <div class="info-input-row flex-3">
                    <div class="info-input-group"><span class="info-label">誕生日</span><input type="text" id="char-birthday" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">種族</span><input type="text" id="char-race" placeholder=""></div>
                    <div class="info-input-group"><span class="info-label">最終学歴</span><input type="text" id="char-education" placeholder=""></div>
                </div>
            </div>
        </div>
    </div>

    <div id="image-modal" class="image-modal" style="display:none;">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <h3>アイコン画像追加</h3>
                <button type="button" class="btn-close" onclick="closeImageModal()">✕</button>
            </div>
            <div id="image-rows-container"></div>
            <button type="button" class="btn-add-img-row" onclick="addImageRow()">+ アイコンを追加</button>
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
    const container = document.getElementById('image-rows-container');
    container.innerHTML = '';
    window.charImages.forEach((img, i) => {
        container.innerHTML += `
            <div class="image-row">
                <div class="img-preview-mini"><img src="${img.url || ''}" alt="NoImg"></div>
                <input type="text" class="img-desc-input" placeholder="説明 (例: 笑顔)" value="${img.desc}" oninput="window.charImages[${i}].desc = this.value">
                <label class="btn-change-file">画像変更<input type="file" style="display:none;" onchange="uploadImage(${i}, this)" accept="image/*"></label>
                <button type="button" class="btn-delete-img" onclick="deleteImageRow(${i})">🗑</button>
            </div>
        `;
    });
}

function addImageRow() { window.charImages.push({url: '', desc: ''}); renderImageRows(); }
function deleteImageRow(i) { window.charImages.splice(i, 1); renderImageRows(); }
function uploadImage(i, input) {
    if(!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => { window.charImages[i].url = e.target.result; renderImageRows(); };
    reader.readAsDataURL(input.files[0]);
}
function updateMainPreview() {
    const preview = document.getElementById('main-image-preview');
    if(window.charImages.length > 0 && window.charImages[0].url) {
        preview.innerHTML = `<img src="${window.charImages[0].url}" style="width:100%; height:100%; object-fit:contain;">`;
    } else {
        preview.innerHTML = '<span class="no-img-text">No Image</span>';
    }
}