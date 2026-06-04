function exportToCocofolia() {
    // 画面上の全入力データ（基本情報、能力値、技能）を収集
    const charData = {
        name: document.getElementById("char-name-new")?.value || "探索者",
        stats: {},
        skills: {}
    };

    // 能力値の収集
    ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'].forEach(stat => {
        charData.stats[stat] = document.getElementById(`cur-${stat}`)?.textContent || "0";
    });

    // 技能（各技能の合計値）の収集
    document.querySelectorAll(".skill-row").forEach(row => {
        const name = row.querySelector(".name-col")?.innerText.replace(/\（.*\）/, "") || "不明";
        const total = row.querySelector(".skill-total")?.textContent || "0";
        charData.skills[name] = total;
    });

    // ココフォリア用JSONデータ作成
    const json = {
        name: charData.name,
        memo: `STR:${charData.stats.STR} CON:${charData.stats.CON} POW:${charData.stats.POW} DEX:${charData.stats.DEX} APP:${charData.stats.APP} SIZ:${charData.stats.SIZ} INT:${charData.stats.INT} EDU:${charData.stats.EDU}\n\n【技能】\n` + 
              Object.entries(charData.skills).map(([k, v]) => `${k}:${v}`).join("\n"),
        status: [{ name: "SAN", value: document.getElementById("cur-SAN")?.textContent || 0, max: 99 }]
    };

    // クリップボードへコピー
    navigator.clipboard.writeText(JSON.stringify(json)).then(() => {
        alert("ココフォリア用データをコピーしました！ココフォリアの画面でCtrl+Vしてください。");
    });
}