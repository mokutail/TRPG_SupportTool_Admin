// 技能セクションのHTML構造をコンポーネント管理
const SKILL_VALUE_COMPONENT = `
    <!-- 職業P・興味Pカスタム連動ヘッダーパネル -->
    <div class="skills-point-header-table">
        <div class="p-header-row p-head-title">
            <div class="p-head-cell"></div>
            <div class="p-head-cell">計算方法</div>
            <div class="p-head-cell">現在値</div>
            <div class="p-head-cell">補正</div>
        </div>
        
        <!-- 職業P行 -->
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

        <!-- 興味P行 -->
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

    <!-- ■ 1. 戦闘技能セクション -->
    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('combat-skills-area', this)">
            <h2 class="section-subtitle">戦闘技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="combat-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col check-col">成長</div>
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
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-回避"></div>
                    <div class="s-col name-col">回避</div>
                    <div class="s-col val-col init-val" id="init-evade">0</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-回避" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-回避">0</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-キック"></div>
                    <div class="s-col name-col">キック</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-キック" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-キック">25</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-組み付き"></div>
                    <div class="s-col name-col">組み付き</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-組み付き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-組み付き">25</span></div>
                </div>
                <div class="skill-row" data-initial="50">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-こぶし"></div>
                    <div class="s-col name-col">こぶし（パンチ）</div>
                    <div class="s-col val-col init-val">50</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-こぶし" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-こぶし">50</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-頭突き"></div>
                    <div class="s-col name-col">頭突き</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-頭突き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-頭突き">10</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-投擲"></div>
                    <div class="s-col name-col">投擲</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-投擲" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-投擲">25</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-マーシャルアーツ"></div>
                    <div class="s-col name-col">マーシャルアーツ</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-マーシャルアーツ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-マーシャルアーツ">1</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-拳銃"></div>
                    <div class="s-col name-col">拳銃</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-拳銃" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-拳銃">20</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-サブマシンガン"></div>
                    <div class="s-col name-col">サブマシンガン</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-サブマシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-サブマシンガン">15</span></div>
                </div>
                <div class="skill-row" data-initial="30">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-ショットガン"></div>
                    <div class="s-col name-col">ショットガン</div>
                    <div class="s-col val-col init-val">30</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-ショットガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-ショットガン">30</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-マシンガン"></div>
                    <div class="s-col name-col">マシンガン</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-マシンガン" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-マシンガン">15</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-ライフル"></div>
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
                <div class="s-col check-col">成長</div>
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill">追加</button>
            </div>
        </div>
    </div>

    <!-- ■ 2. 探索技能セクション -->
    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('exploration-skills-area', this)">
            <h2 class="section-subtitle">探索技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="exploration-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col check-col">成長</div>
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
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-応急手当"></div>
                    <div class="s-col name-col">応急手当</div>
                    <div class="s-col val-col init-val">30</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-応急手当" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-応急手当">30</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-鍵開け"></div>
                    <div class="s-col name-col">鍵開け</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-鍵開け" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-鍵開け">1</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-隠す"></div>
                    <div class="s-col name-col">隠す</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-隠す" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-隠す">15</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-隠れる"></div>
                    <div class="s-col name-col">隠れる</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-隠れる" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-隠れる">10</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-聞き耳"></div>
                    <div class="s-col name-col">聞き耳</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-聞き耳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-聞き耳">25</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-忍び歩き"></div>
                    <div class="s-col name-col">忍び歩き</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-忍び歩き" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-忍び歩き">10</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-写真術"></div>
                    <div class="s-col name-col">写真術</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-写真術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-写真術">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-精神分析"></div>
                    <div class="s-col name-col">精神分析</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-精神分析" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-精神分析">1</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-追跡"></div>
                    <div class="s-col name-col">追跡</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-追跡" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-追跡">10</span></div>
                </div>
                <div class="skill-row" data-initial="40">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-登攀"></div>
                    <div class="s-col name-col">登攀</div>
                    <div class="s-col val-col init-val">40</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-登攀" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-登攀">40</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-図書館"></div>
                    <div class="s-col name-col">図書館</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-図書館" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-図書館">25</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-目星"></div>
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
                <div class="s-col check-col">成長</div>
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill">追加</button>
            </div>
        </div>
    </div>

    <!-- ■ 3. 行動技能セクション -->
    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('action-skills-area', this)">
            <h2 class="section-subtitle">行動技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="action-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col check-col">成長</div>
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
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-運転"></div>
                    <div class="s-col name-col font-input-wrapper">運転（<input type="text" class="skill-name-inline" placeholder="自動車" value="">）</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-運転" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-運転">20</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-機械修理"></div>
                    <div class="s-col name-col">機械修理</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-機械修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-機械修理">20</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-重機械操作"></div>
                    <div class="s-col name-col">重機械操作</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-重機械操作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-重機械操作">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-乗馬"></div>
                    <div class="s-col name-col">乗馬</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-乗馬" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-乗馬">5</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-水泳"></div>
                    <div class="s-col name-col">水泳</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-水泳" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-水泳">25</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-製作"></div>
                    <div class="s-col name-col font-input-wrapper">製作（<input type="text" class="skill-name-inline" placeholder="料理" value="">）</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-製作" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-製作">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-操縦"></div>
                    <div class="s-col name-col font-input-wrapper">操縦（<input type="text" class="skill-name-inline" placeholder="飛行機" value="">）</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-操縦" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-操縦">1</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-跳躍"></div>
                    <div class="s-col name-col">跳躍</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-跳躍" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-跳躍">25</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-電気修理"></div>
                    <div class="s-col name-col">電気修理</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-電気修理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-電気修理">10</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-ナビゲート"></div>
                    <div class="s-col name-col">ナビゲート</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-ナビゲート" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-ナビゲート">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-変装"></div>
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
                <div class="s-col check-col">成長</div>
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill">追加</button>
            </div>
        </div>
    </div>

    <!-- ■ 4. 交渉技能セクション -->
    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('negotiation-skills-area', this)">
            <h2 class="section-subtitle">交渉技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="negotiation-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col check-col">成長</div>
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
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-言いくるめ"></div>
                    <div class="s-col name-col">言いくるめ</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-言いくるめ" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-言いくるめ">5</span></div>
                </div>
                <div class="skill-row" data-initial="15">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-信用"></div>
                    <div class="s-col name-col">信用</div>
                    <div class="s-col val-col init-val">15</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-信用" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-信用">15</span></div>
                </div>
                <div class="skill-row" data-initial="25">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-説得"></div>
                    <div class="s-col name-col">説得</div>
                    <div class="s-col val-col init-val">25</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-説得" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-説得">25</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-値切り"></div>
                    <div class="s-col name-col">値切り</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-値切り" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-値切り">5</span></div>
                </div>
                <div class="skill-row" data-initial="0">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-母国語"></div>
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
                <div class="s-col check-col">成長</div>
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill">追加</button>
            </div>
        </div>
    </div>

    <!-- ■ 5. 知識技能セクション -->
    <div class="skills-section">
        <div class="section-subtitle-bar" onclick="toggleAccordion('knowledge-skills-area', this)">
            <h2 class="section-subtitle">知識技能</h2>
            <span class="accordion-icon">⋁</span>
        </div>
        
        <div id="knowledge-skills-area" class="accordion-content open">
            <div class="skills-table-header">
                <div class="s-col check-col">成長</div>
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
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-医学"></div>
                    <div class="s-col name-col">医学</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-医学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-医学">5</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-オカルト"></div>
                    <div class="s-col name-col">オカルト</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-オカルト" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-オカルト">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-化学"></div>
                    <div class="s-col name-col">化学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-化学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-化学">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-芸術"></div>
                    <div class="s-col name-col font-input-wrapper">芸術（<input type="text" class="skill-name-inline" placeholder="絵画" value="">）</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-芸術" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-芸術">5</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-経理"></div>
                    <div class="s-col name-col">経理</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-経理" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-経理">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-考古学"></div>
                    <div class="s-col name-col">考古学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-考古学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-考古学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-コンピューター"></div>
                    <div class="s-col name-col">コンピューター</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-コンピューター" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-コンピューター">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-心理学"></div>
                    <div class="s-col name-col">心理学</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-心理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-心理学">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-人類学"></div>
                    <div class="s-col name-col">人類学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-人類学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-人類学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-生物学"></div>
                    <div class="s-col name-col">生物学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-生物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-生物学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-地質学"></div>
                    <div class="s-col name-col">地質学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-地質学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-地質学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-電子工学"></div>
                    <div class="s-col name-col">電子工学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-電子工学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-電子工学">1</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-天文学"></div>
                    <div class="s-col name-col">天文学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-天文学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-天文学">1</span></div>
                </div>
                <div class="skill-row" data-initial="10">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-博物学"></div>
                    <div class="s-col name-col">博物学</div>
                    <div class="s-col val-col init-val">10</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-博物学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-博物学">10</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-物理学"></div>
                    <div class="s-col name-col">物理学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-物理学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-物理学">1</span></div>
                </div>
                <div class="skill-row" data-initial="5">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-法律"></div>
                    <div class="s-col name-col">法律</div>
                    <div class="s-col val-col init-val">5</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-法律" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-法律">5</span></div>
                </div>
                <div class="skill-row" data-initial="1">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-薬学"></div>
                    <div class="s-col name-col">薬学</div>
                    <div class="s-col val-col init-val">1</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-薬学" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-薬学">1</span></div>
                </div>
                <div class="skill-row" data-initial="20">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-歴史"></div>
                    <div class="s-col name-col">歴史</div>
                    <div class="s-col val-col init-val">20</div>
                    <div class="s-col input-col"><input type="number" name="sk-job-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-int-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-gro-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col input-col"><input type="number" name="sk-oth-歴史" placeholder="" min="" oninput="calcSkills()"></div>
                    <div class="s-col total-col"><span class="skill-total" id="total-歴史">20</span></div>
                </div>

                <!-- クトゥルフ神話技能 -->
                <div class="skill-row skill-mythos-row" data-initial="0">
                    <div class="s-col check-col"><input type="checkbox" name="sk-chk-神話"></div>
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
                <div class="s-col check-col">成長</div>
                <div class="s-col name-col">技能名</div>
                <div class="s-col val-col">初期値</div>
                <div class="s-col input-col">職業P</div>
                <div class="s-col input-col">興味P</div>
                <div class="s-col input-col">成長分</div>
                <div class="s-col input-col">その他</div>
                <div class="s-col total-col">合計</div>
            </div>

            <div class="skill-table-control">
                <button type="button" class="btn-add-skill">追加</button>
            </div>
        </div>
    </div>
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