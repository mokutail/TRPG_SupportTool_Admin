// 基本情報セクションのHTML構造（最終学歴追加・プラスボタン削除版）
const BASIC_INFO_COMPONENT = `
    <div class="info-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('base-info-area', this)">
            <h2 class="section-subtitle">基本情報</h2>
            <span class="accordion-icon">⋁</span>
        </div>

        <div id="base-info-area" class="info-content-wrapper open">
            <div class="info-left-box">
                <div class="image-preview-placeholder">
                    <span class="no-img-text">No Image</span>
                </div>
                <button type="button" class="btn-change-image">🖊 画像の変更・追加</button>
            </div>

            <div class="info-right-box">
                <div class="info-input-row flex-2">
                    <div class="info-input-group">
                        <span class="info-label">名前</span>
                        <input type="text" id="char-name-new" placeholder="新たな探索者" required>
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">ふりがな</span>
                        <input type="text" id="char-furigana" placeholder="">
                    </div>
                </div>

                <div class="info-input-row">
                    <div class="info-input-group">
                        <span class="info-label">タグ</span>
                        <input type="text" id="char-tag" placeholder="">
                    </div>
                </div>

                <div class="info-input-row flex-3">
                    <div class="info-input-group">
                        <span class="info-label">職業</span>
                        <input type="text" id="char-job" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">年齢</span>
                        <input type="text" id="char-age" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">性別</span>
                        <input type="text" id="char-gender" placeholder="">
                    </div>
                </div>

                <div class="info-input-row flex-3">
                    <div class="info-input-group">
                        <span class="info-label">身長</span>
                        <input type="text" id="char-height" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">体重</span>
                        <input type="text" id="char-weight" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">出身</span>
                        <input type="text" id="char-origin" placeholder="">
                    </div>
                </div>

                <div class="info-input-row flex-3">
                    <div class="info-input-group">
                        <span class="info-label">髪の色</span>
                        <input type="text" id="char-hair" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">瞳の色</span>
                        <input type="text" id="char-eyes" placeholder="">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">肌の色</span>
                        <input type="text" id="char-skin" placeholder="">
                    </div>
                </div>

                <div class="info-input-row flex-3">
                    <div class="info-input-group">
                        <span class="info-label">誕生日</span>
                        <input type="text" id="char-birthday" placeholder="○月○日">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">種族</span>
                        <input type="text" id="char-race" placeholder="人間">
                    </div>
                    <div class="info-input-group">
                        <span class="info-label">最終学歴</span>
                        <input type="text" id="char-education" placeholder="">
                    </div>
                </div>

                <div class="info-bottom-control-bar">
                    <button type="button" class="btn-color-palette" title="パレット設定">🎨</button>
                    </div>
            </div>
        </div>
    </div>
`;

// コンポーネントをメイン画面に流し込み
document.getElementById("component-info-value").innerHTML = BASIC_INFO_COMPONENT;

// 保存システム用の隠れ処理
document.addEventListener("DOMContentLoaded", () => {
    const newNameInput = document.getElementById("char-name-new");
    if (newNameInput) {
        newNameInput.addEventListener("input", () => {
            const form = document.getElementById("char-editor");
            if (form) form.dataset.探索者名 = newNameInput.value;
        });
    }
});