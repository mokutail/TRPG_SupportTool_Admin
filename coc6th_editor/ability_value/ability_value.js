function diceRoll(num, size, add = 0) {
    let total = add;
    for (let i = 0; i < num; i++) {
        total += Math.floor(Math.random() * size) + 1;
    }
    return total;
}

// 能力値セクションのHTML構造をコンポーネント管理
const ABILITY_VALUE_COMPONENT = `
    <h2 class="section-subtitle">能力値一覧</h2>
    
    <div class="ability-table">
        <div class="table-row row-header">
            <div class="cell label-cell">項目</div>
            <div class="cell header-cell" data-popup="3d6 で決定 (2-18)">STR<button type="button" class="btn-dice" onclick="rollIndividual('STR')">🎲</button></div>
            <div class="cell header-cell" data-popup="3d6 で決定 (2-18)">CON<button type="button" class="btn-dice" onclick="rollIndividual('CON')">🎲</button></div>
            <div class="cell header-cell" data-popup="3d6 で決定 (2-18)">POW<button type="button" class="btn-dice" onclick="rollIndividual('POW')">🎲</button></div>
            <div class="cell header-cell" data-popup="3d6 で決定 (2-18)">DEX<button type="button" class="btn-dice" onclick="rollIndividual('DEX')">🎲</button></div>
            <div class="cell header-cell" data-popup="3d6 で決定 (2-18)">APP<button type="button" class="btn-dice" onclick="rollIndividual('APP')">🎲</button></div>
            <div class="cell header-cell" data-popup="2d6+6 で決定 (8-18)">SIZ<button type="button" class="btn-dice" onclick="rollIndividual('SIZ')">🎲</button></div>
            <div class="cell header-cell" data-popup="2d6+6 で決定 (8-18)">INT<button type="button" class="btn-dice" onclick="rollIndividual('INT')">🎲</button></div>
            <div class="cell header-cell" data-popup="3d6+3 で決定 (3-21)">EDU<button type="button" class="btn-dice" onclick="rollIndividual('EDU')">🎲</button></div>
            <div class="cell" data-popup="算出方法: (CON + SIZ) / 2 ※端数切り上げ">HP</div>
            <div class="cell" data-popup="算出方法: POW と同じ値">MP</div>
            <div class="cell" data-popup="算出方法: POW × 5">SAN</div>
            <div class="cell" data-popup="算出方法: INT × 5">IDE</div>
            <div class="cell" data-popup="算出方法: POW × 5">幸運</div>
            <div class="cell" data-popup="算出方法: EDU × 5">知識</div>
        </div>

        <div class="table-row row-base">
            <div class="cell label-cell">能力値</div>
            <div class="cell"><select name="base-STR" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-CON" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-POW" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-DEX" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-APP" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-SIZ" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-INT" onchange="calcAll()"></select></div>
            <div class="cell"><select name="base-EDU" onchange="calcAll()"></select></div>
            <div class="cell"><span id="base-HP" class="auto-calc">-</span></div>
            <div class="cell"><span id="base-MP" class="auto-calc">-</span></div>
            <div class="cell"><span id="base-SAN" class="auto-calc">-</span></div>
            <div class="cell"><span id="base-IDE" class="auto-calc">-</span></div>
            <div class="cell"><span id="base-幸運" class="auto-calc">-</span></div>
            <div class="cell"><span id="base-知識" class="auto-calc">-</span></div>
        </div>

        <div class="table-row row-bonus">
            <div class="cell label-cell">増加分</div>
            <div class="cell"><input type="number" name="bonus-STR" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-CON" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-POW" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-DEX" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-APP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-SIZ" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-INT" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-EDU" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-HP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-MP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-SAN" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-IDE" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-幸運" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="bonus-知識" placeholder="0" oninput="calcAll()"></div>
        </div>

        <div class="table-row row-temp">
            <div class="cell label-cell">一時的</div>
            <div class="cell"><input type="number" name="temp-STR" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-CON" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-POW" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-DEX" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-APP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-SIZ" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-INT" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-EDU" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-HP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-MP" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-SAN" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-IDE" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-幸運" placeholder="0" oninput="calcAll()"></div>
            <div class="cell"><input type="number" name="temp-知識" placeholder="0" oninput="calcAll()"></div>
        </div>

        <div class="table-row row-current">
            <div class="cell label-cell">現在値</div>
            <div class="cell" id="cur-STR">0</div>
            <div class="cell" id="cur-CON">0</div>
            <div class="cell" id="cur-POW">0</div>
            <div class="cell" id="cur-DEX">0</div>
            <div class="cell" id="cur-APP">0</div>
            <div class="cell" id="cur-SIZ">0</div>
            <div class="cell" id="cur-INT">0</div>
            <div class="cell" id="cur-EDU">0</div>
            <div class="cell" id="cur-HP">0</div>
            <div class="cell" id="cur-MP">0</div>
            <div class="cell" id="cur-SAN">0</div>
            <div class="cell" id="cur-IDE">0</div>
            <div class="cell" id="cur-幸運">0</div>
            <div class="cell" id="cur-知識">0</div>
        </div>
    </div>

    <div class="derived-status-panel">
        <div class="status-panel-row">
            <div class="panel-item item-san">
                <span class="panel-label">SAN値</span>
                <div class="panel-value-box">
                    <input type="number" id="san-input" placeholder="0" min="0" max="99" oninput="handleSanInput()">
                    <span class="san-max">/ 99</span>
                </div>
            </div>
            <div class="panel-item item-insanity">
                <span class="panel-label">不定</span>
                <div class="panel-value-box" id="insanity-display">0</div>
            </div>
        </div>
        <div class="status-panel-row">
            <div class="panel-item item-db">
                <span class="panel-label">ダメージボーナス</span>
                <div class="panel-value-box" id="db-display">なし</div>
            </div>
        </div>
    </div>
`;

document.getElementById("component-ability-value").innerHTML = ABILITY_VALUE_COMPONENT;

let hasManuallySetSan = false;

function handleSanInput() {
    hasManuallySetSan = true;
    calcInsanityOnly();
}

const selectElements = document.querySelectorAll(".row-base select");
selectElements.forEach(select => {
    select.innerHTML = "";
    const placeholderOpt = document.createElement("option");
    placeholderOpt.value = ""; placeholderOpt.textContent = ""; placeholderOpt.selected = true;
    select.appendChild(placeholderOpt);
    let min = 2; let max = 18;
    if (select.name === "base-EDU") { min = 3; max = 21; }
    for (let i = min; i <= max; i++) {
        const opt = document.createElement("option");
        opt.value = i; opt.textContent = i; select.appendChild(opt);
    }
});

const tooltip = document.getElementById("js-tooltip");
const cellsWithPopup = document.querySelectorAll(".row-header .cell[data-popup]");
cellsWithPopup.forEach(cell => {
    cell.addEventListener("mouseenter", () => {
        const text = cell.getAttribute("data-popup");
        if (!text) return;
        tooltip.textContent = text; tooltip.style.display = "block";
        const rect = cell.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 8}px`;
        tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    });
    cell.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
});

calcAll();

function rollIndividual(stat) {
    const select = document.querySelector(`select[name="base-${stat}"]`);
    if (!select) return;
    let result = 0;
    if (stat === 'STR' || stat === 'CON' || stat === 'POW' || stat === 'DEX' || stat === 'APP') { result = diceRoll(3, 6); }
    else if (stat === 'SIZ' || stat === 'INT') { result = diceRoll(2, 6, 6); }
    else if (stat === 'EDU') { result = diceRoll(3, 6, 3); }
    select.value = result;

    if (stat === 'POW') {
        hasManuallySetSan = false;
    }
    calcAll();
}

function rollAll() {
    hasManuallySetSan = false;
    ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'].forEach(stat => rollIndividual(stat));
}

function calcAll() {
    const primaryStats = ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'];
    const baseValues = {}; const currentValues = {};

    primaryStats.forEach(stat => {
        const selectEl = document.querySelector(`select[name="base-${stat}"]`);
        const base = selectEl ? (parseInt(selectEl.value) || 0) : 0;
        // ★修正：空欄の時も「0」として安全に計算にマージするガード
        const bonus = parseInt(document.querySelector(`input[name="bonus-${stat}"]`)?.value) || 0;
        const temp = parseInt(document.querySelector(`input[name="temp-${stat}"]`)?.value) || 0;
        baseValues[stat] = base;
        currentValues[stat] = base === 0 ? 0 : (base + bonus + temp);
        const curEl = document.getElementById(`cur-${stat}`);
        if (curEl) curEl.textContent = base === 0 ? 0 : currentValues[stat];
    });

    const evadeInit = currentValues['DEX'] * 2;
    const evadeInitDisplay = document.getElementById('init-evade');
    if (evadeInitDisplay) {
        evadeInitDisplay.textContent = evadeInit;
        const row = evadeInitDisplay.closest('.skill-row');
        if (row) row.setAttribute('data-initial', evadeInit);
    }

    const nativeInit = currentValues['EDU'] * 5;
    const nativeInitDisplay = document.getElementById('init-native-lang');
    if (nativeInitDisplay) {
        nativeInitDisplay.textContent = nativeInit;
        const row = nativeInitDisplay.closest('.skill-row');
        if (row) row.setAttribute('data-initial', nativeInit);
    }

    const hasHP = baseValues['CON'] > 0 && baseValues['SIZ'] > 0;
    const hasMP = baseValues['POW'] > 0;
    const hasIDE = baseValues['INT'] > 0;
    const hasKnow = baseValues['EDU'] > 0;

    const BoneHP = hasHP ? Math.ceil((baseValues['CON'] + baseValues['SIZ']) / 2) : 0;
    document.getElementById('base-HP').textContent = hasHP ? BoneHP : "-";
    const bonusHP = parseInt(document.querySelector(`input[name="bonus-HP"]`)?.value) || 0;
    const tempHP = parseInt(document.querySelector(`input[name="temp-HP"]`)?.value) || 0;
    document.getElementById('cur-HP').textContent = hasHP ? (BoneHP + bonusHP + tempHP) : 0;

    const baseMP = hasMP ? baseValues['POW'] : 0;
    document.getElementById('base-MP').textContent = hasMP ? baseMP : "-";
    const bonusMP = parseInt(document.querySelector(`input[name="bonus-MP"]`)?.value) || 0;
    const tempMP = parseInt(document.querySelector(`input[name="temp-MP"]`)?.value) || 0;
    document.getElementById('cur-MP').textContent = hasMP ? (baseMP + bonusMP + tempMP) : 0;

    const baseSAN = hasMP ? baseValues['POW'] * 5 : 0;
    document.getElementById('base-SAN').textContent = hasMP ? baseSAN : "-";
    const bonusSAN = parseInt(document.querySelector(`input[name="bonus-SAN"]`)?.value) || 0;
    const tempSAN = parseInt(document.querySelector(`input[name="temp-SAN"]`)?.value) || 0;
    const totalSAN = hasMP ? (baseSAN + bonusSAN + tempSAN) : 0;
    document.getElementById('cur-SAN').textContent = totalSAN;

    const baseIDE = hasIDE ? baseValues['INT'] * 5 : 0;
    document.getElementById('base-IDE').textContent = hasIDE ? baseIDE : "-";
    const bonusIDE = parseInt(document.querySelector(`input[name="bonus-IDE"]`)?.value) || 0;
    const tempIDE = parseInt(document.querySelector(`input[name="temp-IDE"]`)?.value) || 0;
    document.getElementById('cur-IDE').textContent = hasIDE ? (baseIDE + bonusIDE + tempIDE) : 0;

    const baseLucky = hasMP ? baseValues['POW'] * 5 : 0;
    document.getElementById('base-幸運').textContent = hasMP ? baseLucky : "-";
    const bonusLucky = parseInt(document.querySelector(`input[name="bonus-幸運"]`)?.value) || 0;
    const tempLucky = parseInt(document.querySelector(`input[name="temp-幸運"]`)?.value) || 0;
    document.getElementById('cur-幸運').textContent = hasMP ? (baseLucky + bonusLucky + tempLucky) : 0;

    const baseKnow = hasKnow ? baseValues['EDU'] * 5 : 0;
    document.getElementById('base-知識').textContent = hasKnow ? baseKnow : "-";
    const bonusKnow = parseInt(document.querySelector(`input[name="bonus-知識"]`)?.value) || 0;
    const tempKnow = parseInt(document.querySelector(`input[name="temp-知識"]`)?.value) || 0;
    document.getElementById('cur-知識').textContent = hasKnow ? (baseKnow + bonusKnow + tempKnow) : 0;

    if (baseValues['STR'] === 0 || baseValues['SIZ'] === 0) {
        document.getElementById('db-display').textContent = "なし";
    } else {
        const sumDb = currentValues['STR'] + currentValues['SIZ'];
        let dbResult = "0";
        if (sumDb >= 2 && sumDb <= 12) { dbResult = "-1D6"; }
        else if (sumDb >= 13 && sumDb <= 16) { dbResult = "-1D4"; }
        else if (sumDb >= 17 && sumDb <= 24) { dbResult = "0"; }
        else if (sumDb >= 25 && sumDb <= 32) { dbResult = "+1D4"; }
        else if (sumDb >= 33 && sumDb <= 40) { dbResult = "+1D6"; }
        else if (sumDb >= 41 && sumDb <= 56) { dbResult = "+2D6"; }
        document.getElementById('db-display').textContent = dbResult;
    }

    let jobMax = 0;
    const jobMethod = document.getElementById('job-calc-method')?.value || "EDU*20";
    const jobBonus = parseInt(document.getElementById('job-points-bonus')?.value) || 0;

    if (jobMethod === "MANUAL") {
        jobMax = jobBonus;
    } else {
        if (jobMethod === "EDU*20") { jobMax = currentValues['EDU'] * 20; }
        else if (jobMethod === "STR*10+EDU*10") { jobMax = (currentValues['STR'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "CON*10+EDU*10") { jobMax = (currentValues['CON'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "POW*10+EDU*10") { jobMax = (currentValues['POW'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "DEX*10+EDU*10") { jobMax = (currentValues['DEX'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "APP*10+EDU*10") { jobMax = (currentValues['APP'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "SIZ*10+EDU*10") { jobMax = (currentValues['SIZ'] * 10) + (currentValues['EDU'] * 10); }
        else if (jobMethod === "INT*10+EDU*10") { jobMax = (currentValues['INT'] * 10) + (currentValues['EDU'] * 10); }
        jobMax += jobBonus;
    }

    const interestBonus = parseInt(document.getElementById('interest-points-bonus')?.value) || 0;
    const interestMax = (currentValues['INT'] * 10) + interestBonus;

    const jobMaxEl = document.getElementById('job-points-max');
    const interestMaxEl = document.getElementById('interest-points-max');
    if (jobMaxEl) jobMaxEl.textContent = `/ ${jobMax}`;
    if (interestMaxEl) interestMaxEl.textContent = `/ ${interestMax}`;

    const sanInput = document.getElementById('san-input');
    if (sanInput && !hasManuallySetSan) {
        if (!hasMP) { sanInput.value = ""; } else { sanInput.value = totalSAN; }
    }

    if (typeof calcSkills === "function" && document.querySelectorAll(".skill-row").length > 0) {
        calcSkills();
    }
}

function calcSkills() {
    let totalJobUsed = 0; let totalInterestUsed = 0;
    const skillRows = document.querySelectorAll(".skill-row");
    if (skillRows.length === 0) return;

    skillRows.forEach(row => {
        const initVal = parseInt(row.getAttribute("data-initial")) || 0;
        // ★修正：入力欄が空欄（""）のときも NaN を回避して 0 に置換するガード
        const jobP = parseInt(row.querySelector('input[name^="sk-job-"]')?.value, 10) || 0;
        const interestP = parseInt(row.querySelector('input[name^="sk-int-"]')?.value, 10) || 0;
        const growP = parseInt(row.querySelector('input[name^="sk-gro-"]')?.value, 10) || 0;
        const otherP = parseInt(row.querySelector('input[name^="sk-oth-"]')?.value, 10) || 0;
        const mythosP = parseInt(row.querySelector('input[name="skill-mythos"]')?.value, 10) || 0;

        let total = initVal + jobP + interestP + growP + otherP + mythosP;
        if (total > 99) total = 99;
        
        const totalEl = row.querySelector(".skill-total");
        if (totalEl) totalEl.textContent = total;

        totalJobUsed += jobP; totalInterestUsed += interestP;
    });

    const jobMaxEl = document.getElementById('job-points-max');
    const interestMaxEl = document.getElementById('interest-points-max');
    if (!jobMaxEl || !interestMaxEl) return;

    const jobMax = parseInt(jobMaxEl.textContent.replace('/ ', ''), 10) || 0;
    const interestMax = parseInt(interestMaxEl.textContent.replace('/ ', ''), 10) || 0;

    document.getElementById('job-points-left').textContent = jobMax - totalJobUsed;
    document.getElementById('interest-points-left').textContent = interestMax - totalInterestUsed;

    calcInsanityOnly();
}

function calcInsanityOnly() {
    const sanInput = document.getElementById('san-input');
    if (!sanInput) return;
    if (document.getElementById('base-SAN').textContent === "-") {
        sanInput.value = ""; document.getElementById('insanity-display').textContent = "0";
        document.querySelector('.san-max').textContent = "/ 99"; return;
    }
    const mythosValue = parseInt(document.getElementById('total-mythos')?.textContent, 10) || 0;
    const maxSan = 99 - mythosValue;
    
    const maxSanEl = document.querySelector('.san-max');
    if (maxSanEl) maxSanEl.textContent = `/ ${maxSan}`;

    // 空欄時は暫定0として不定を算出
    let currentSan = parseInt(sanInput.value, 10) || 0;
    
    if (currentSan > maxSan) { currentSan = maxSan; sanInput.value = maxSan; }
    if (currentSan < 0) { currentSan = 0; sanInput.value = 0; }
    document.getElementById('insanity-display').textContent = Math.floor(currentSan * 0.2);
}

document.getElementById('char-editor').addEventListener('submit', (e) => {
    e.preventDefault();
    const charNameInput = document.getElementById('char-name-new');
    const finalName = charNameInput ? charNameInput.value : "新たな探索者";
    const charData = { name: finalName, id: Date.now() };
    let chars = JSON.parse(localStorage.getItem('characters') || '[]');
    chars.push(charData); localStorage.setItem('characters', JSON.stringify(chars));
    window.location.href = '../index.html';
});
