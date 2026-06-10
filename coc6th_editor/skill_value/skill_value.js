// 技能セクションのHTML構造をコンポーネント管理
// ※一番左の「成長」チェック列を削除し、削除(✖)ボタンは技能名の横に配置してズレを解消しました
const SKILL_VALUE_COMPONENT = `
    <div class="skills-point-header-table">
        <div class="p-header-row p-head-title">
            <div class="p-head-cell"></div>
            <div class="p-head-cell">計算方法</div>
            <div class="p-head-cell">現在値</div>
            <div class="p-head-cell">補正</div>
        </div>
        
        <div class="p-header-row">
            <div class="p-head-cell p-label">職業P</div>
            <div class="p-head-cell">
                <select id="job-calc-method" onchange="calcAll()">
                    <option value="EDU*20">EDU×20</option>
                    <option value="STR*10+EDU*10">STR×10+EDU×10</option>
                    <option value="CON*10+EDU*10">CON×10+EDU×10</option>
                    <option value="POW*10+EDU*10">POW×10+EDU×10</option>
                    <option value="DEX*10+EDU*10">DEX×10+EDU×10</option>
                    <option value="APP*10+EDU*10">APP×10+EDU×10</option>
                    <option value="SIZ*10+EDU*10">SIZ×10+EDU×10</option>
                    <option value="INT*10+EDU*10">INT×10+EDU×10</option>
                    <option value="MANUAL">手動入力</option>
                </select>
            </div>
            <div class="p-head-cell p-value-display">
                <span class="point-left" id="job-points-left">0</span><span class="point-max" id="job-points-max">/ 0</span>
            </div>
            <div class="p-head-cell p-input-cell">
                <input type="number" id="job-points-bonus" placeholder="" oninput="calcAll()">
            </div>
        </div>

        <div class="p-header-row">
            <div class="p-head-cell p-label">興味P</div>
            <div class="p-head-cell">
                <span class="interest-method-text">INT×10</span>
            </div>
            <div class="p-head-cell p-value-display">
                <span class="point-left" id="interest-points-left">0</span><span class="point-max" id="interest-points-max">/ 0</span>
            </div>
            <div class="p-head-cell p-input-cell">
                <input type="number" id="interest-points-bonus" placeholder="" oninput="calcAll()">
            </div>
        </div>
    </div>

    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('combat-skills-area', this)">
            <h2 class="section-subtitle">戦闘技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="combat-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skills-list">
                <div class="skill-row" data-initial="0">
                    <div class="s-col name-col">回避</div>
                    <div class="s-col val-col init-val" id="init-evade">0</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-回避">0</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">キック</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-キック">25</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">組み付き</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-組み付き">25</span></div>
                </div>
                <div class="skill-row" data-initial="50">
                    <div class="s-col name-col">こぶし（パンチ）</div>
                    <div class="s-col val-col init-val">50</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-こぶし">50</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">頭突き</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-頭突き">10</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">投擲</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-投擲">25</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">マーシャルアーツ</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-マーシャルアーツ">1</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col name-col">拳銃</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-拳銃">20</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col name-col">サブマシンガン</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-サブマシンガン">15</span></div>
                </div>
                <div class="skill-row" data-initial="30">
                    <div class="s-col name-col">ショットガン</div>
                    <div class="s-col val-col init-val">30</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-ショットガン">30</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col name-col">マシンガン</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-マシンガン">15</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">ライフル</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-ライフル" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-ライフル" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-ライフル" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-ライフル" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-ライフル">25</span></div>
                </div>
            </div>

            <div class="skills-table-footer-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill" onclick="addCustomSkill(this)">+ 技能を追加</button>
            </div>
        </div>
    </div>

    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('exploration-skills-area', this)">
            <h2 class="section-subtitle">探索技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="exploration-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skills-list">
                <div class="skill-row" data-initial="30">
                    <div class="s-col name-col">応急手当</div>
                    <div class="s-col val-col init-val">30</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-応急手当">30</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">鍵開け</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-鍵開け">1</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col name-col">隠す</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-隠す">15</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">隠れる</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-隠れる">10</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">聞き耳</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-聞き耳">25</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">忍び歩き</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-忍び歩き">10</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">写真術</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-写真術">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">精神分析</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-精神分析">1</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">追跡</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-追跡">10</span></div>
                </div>
                <div class="skill-row" data-initial="40">
                    <div class="s-col name-col">登攀</div>
                    <div class="s-col val-col init-val">40</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-登攀">40</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">図書館</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-図書館">25</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">目星</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-目星" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-目星" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-目星" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-目星" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-目星">25</span></div>
                </div>
            </div>

            <div class="skills-table-footer-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill" onclick="addCustomSkill(this)">+ 技能を追加</button>
            </div>
        </div>
    </div>

    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('action-skills-area', this)">
            <h2 class="section-subtitle">行動技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="action-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skills-list">
                <div class="skill-row" data-initial="20">
                    <div class="s-col name-col font-input-wrapper">運転（<input type="text" class="skill-name-inline" placeholder="自動車" value="">）</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-運転">20</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col name-col">機械修理</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-機械修理">20</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">重機械操作</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-重機械操作">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">乗馬</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-乗馬">5</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">水泳</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-水泳">25</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col font-input-wrapper">製作（<input type="text" class="skill-name-inline" placeholder="料理" value="">）</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-製作">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col font-input-wrapper">操縦（<input type="text" class="skill-name-inline" placeholder="飛行機" value="">）</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-操縦">1</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">跳躍</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-跳躍">25</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">電気修理</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-電気修理">10</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">ナビゲート</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-ナビゲート">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">変装</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-変装" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-変装" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-変装" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-変装" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-変装">1</span></div>
                </div>
            </div>

            <div class="skills-table-footer-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill" onclick="addCustomSkill(this)">+ 技能を追加</button>
            </div>
        </div>
    </div>

    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('negotiation-skills-area', this)">
            <h2 class="section-subtitle">交渉技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="negotiation-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skills-list">
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">言いくるめ</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-言いくるめ">5</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col name-col">信用</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-信用">15</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col name-col">説得</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-説得">25</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">値切り</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-値切り">5</span></div>
                </div>
                <div class="skill-row" data-initial="0">
                    <div class="s-col name-col font-input-wrapper">母国語（<input type="text" class="skill-name-inline" placeholder="日本語" value="">）</div>
                    <div class="s-col val-col init-val" id="init-native-lang">0</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-母国語" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-母国語" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-母国語" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-母国語" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-母国語">0</span></div>
                </div>
            </div>

            <div class="skills-table-footer-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill" onclick="addCustomSkill(this)">+ 技能を追加</button>
            </div>
        </div>
    </div>

    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('knowledge-skills-area', this)">
            <h2 class="section-subtitle">知識技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="knowledge-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skills-list">
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">医学</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-医学">5</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">オカルト</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-オカルト">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">化学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-化学">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col font-input-wrapper">芸術（<input type="text" class="skill-name-inline" placeholder="絵画" value="">）</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-芸術">5</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">経理</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-経理">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">考古学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-考古学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">コンピューター</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-コンピューター">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">心理学</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-心理学">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">人類学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-人類学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">生物学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-生物学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">地質学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-地質学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">電子工学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-電子工学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">天文学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-天文学">1</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col name-col">博物学</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-博物学">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">物理学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-物理学">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col name-col">法律</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-法律">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col name-col">薬学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-薬学">1</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col name-col">歴史</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-歴史">20</span></div>
                </div>

                <div class="skill-row skill-mythos-row" data-initial="0">
                    <div class="s-col name-col mythos-label">クトゥルフ神話</div>
                    <div class="s-col val-col init-val">0</div>
                    <div class="s-col input-col">—</div>
                    <div class="s-col input-col">—</div>
                    <div class="s-col input-col"><input type="number" name="skill-mythos" placeholder="" min="" max="99" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-神話" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total mythos-total" id="total-mythos">0</span></div>
                </div>
            </div>

            <div class="skills-table-footer-header">
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill" onclick="addCustomSkill(this)">+ 技能を追加</button>
            </div>
        </div>
    </div>
    
    <style>
    /* CSSにgrid-template-columnsが残っている場合のズレを防ぐため、チェックボックス列を非表示にする保険CSS */
    .check-col { display: none !important; }
    </style>
`;

document.getElementById("component-skills-list").innerHTML = SKILL_VALUE_COMPONENT;

function toggleAccordion(targetId, headerBar) {
    const content = document.getElementById(targetId);
    const icon = headerBar.querySelector(".accordion-icon");
    if (content.classList.contains("open")) {
        content.classList.remove("open"); content.style.display = "none"; icon.textContent = "⋗";
    } else {
        content.classList.add("open"); content.style.display = "flex"; icon.textContent = "⋁";
    }
}

// 自由追加技能用の処理（削除ボタンを技能名のすぐ隣に配置）
window.addCustomSkill = function(btn) {
    const list = btn.closest('.accordion-content').querySelector('.skills-list');
    const uniqueId = Date.now() + Math.random().toString().slice(2, 6);
    const isKnowledge = btn.closest('#knowledge-skills-area') !== null;

    const row = document.createElement('div');
    row.className = 'skill-row custom-added-skill';
    row.setAttribute('data-initial', '1');

    row.innerHTML = `
        <div class="s-col name-col font-input-wrapper" style="display:flex; align-items:center;">
            <input type="text" class="skill-name-inline custom-name-input" placeholder="追加技能名" oninput="updateCustomSkillName(this, '${uniqueId}')" style="width:100px;">
            <button type="button" style="background:#f04747; color:#fff; border:none; padding:2px 8px; border-radius:4px; margin-left:5px; cursor:pointer;" onclick="this.parentElement.parentElement.remove(); calcSkills(); if(typeof markAsChanged === 'function') markAsChanged();">✖</button>
        </div>
        <div class="s-col val-col">
            <input type="number" class="custom-init-input" name="sk-init-custom_${uniqueId}" value="1" min="0" max="99" oninput="updateCustomSkillInit(this); calcSkills();" style="width:40px; background:transparent; border:1px solid #4f545c; color:#bb86fc; text-align:center; border-radius:4px; font-weight:bold;">
        </div>
        <div class="s-col input-col"><input type="number" name="sk-job-custom_${uniqueId}" oninput="calcSkills()"></div>
        <div class="s-col input-col"><input type="number" name="sk-int-custom_${uniqueId}" oninput="calcSkills()"></div>
        <div class="s-col input-col"><input type="number" name="sk-gro-custom_${uniqueId}" oninput="calcSkills()"></div>
        <div class="s-col input-col"><input type="number" name="sk-oth-custom_${uniqueId}" oninput="calcSkills()"></div>
        <div class="s-col total-col"><span class="skill-total">1</span></div>
    `;

    // 知識技能の場合は「クトゥルフ神話」の上に挿入、それ以外は一番下に追加
    if (isKnowledge) {
        const mythosRow = list.querySelector('.skill-mythos-row');
        if(mythosRow) {
            list.insertBefore(row, mythosRow);
        } else {
            list.appendChild(row);
        }
    } else {
        list.appendChild(row);
    }
    
    if (typeof markAsChanged === 'function') markAsChanged();
};

window.updateCustomSkillName = function(inputEl, id) {
    const name = inputEl.value.trim() || `custom_${id}`;
    const row = inputEl.closest('.skill-row');
    row.querySelector('.custom-init-input').name = `sk-init-${name}`;
    row.querySelector('input[name^="sk-job-"]').name = `sk-job-${name}`;
    row.querySelector('input[name^="sk-int-"]').name = `sk-int-${name}`;
    row.querySelector('input[name^="sk-gro-"]').name = `sk-gro-${name}`;
    row.querySelector('input[name^="sk-oth-"]').name = `sk-oth-${name}`;
    if (typeof markAsChanged === 'function') markAsChanged();
};

window.updateCustomSkillInit = function(inputEl) {
    const row = inputEl.closest('.skill-row');
    row.setAttribute('data-initial', inputEl.value || 0);
    if (typeof markAsChanged === 'function') markAsChanged();
};

function diceRoll(num, size, add = 0) {
    let total = add;
    for (let i = 0; i < num; i++) {
        total += Math.floor(Math.random() * size) + 1;
    }
    return total;
}

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
    if (select.id === "job-calc-method" || select.name === undefined) return;
    if (select.name === "base-EDU") { min = 3; max = 21; }
    for (let i = min; i <= max; i++) {
        const opt = document.createElement("option");
        opt.value = i; opt.textContent = i; select.appendChild(opt);
    }
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
    if (typeof markAsChanged === 'function') markAsChanged();
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

window.calcSkills = function() {
    let totalJobUsed = 0; let totalInterestUsed = 0;
    const skillRows = document.querySelectorAll(".skill-row");
    if (skillRows.length === 0) return;

    skillRows.forEach(row => {
        const initVal = parseInt(row.getAttribute("data-initial")) || 0;
        const jobP = parseInt(row.querySelector('input[name^="sk-job-"]')?.value, 10) || 0;
        const interestP = parseInt(row.querySelector('input[name^="sk-int-"]')?.value, 10) || 0;
        const growP = parseInt(row.querySelector('input[name^="sk-gro-"]')?.value, 10) || 0;
        const otherP = parseInt(row.querySelector('input[name^="sk-oth-"]')?.value, 10) || 0;
        const mythosP = parseInt(row.querySelector('input[name="skill-mythos"]')?.value, 10) || 0;

        let total = initVal + jobP + interestP + growP + otherP + mythosP;
        if (total > 99 && !row.classList.contains('skill-mythos-row')) total = 99; // 神話技能以外は99上限
        
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
};

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

    let currentSan = parseInt(sanInput.value, 10) || 0;
    
    if (currentSan > maxSan) { currentSan = maxSan; sanInput.value = maxSan; }
    if (currentSan < 0) { currentSan = 0; sanInput.value = 0; }
    document.getElementById('insanity-display').textContent = Math.floor(currentSan * 0.2);
}
