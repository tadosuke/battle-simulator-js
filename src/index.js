import Party from "./party.js";
import Character from "./character.js";
import { BattleSequence, BATTLE_RESULT } from "./battle-sequence.js";

// 共通のキャラクターエディタUIを生成する関数
function createCharacterEditor(idPrefix, label) {
    const wrapper = document.createElement("fieldset");
    wrapper.className = "form-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    wrapper.appendChild(legend);

    const fields = [
        {
            key: "name",
            label: "名前",
            type: "text",
            defaultValue: idPrefix === "char" ? "Hero" : "Enemy",
        },
        { key: "hp", label: "HP", type: "number", defaultValue: 100 },
        { key: "atk", label: "攻撃力", type: "number", defaultValue: 20 },
        { key: "def", label: "防御力", type: "number", defaultValue: 10 },
        { key: "spd", label: "素早さ", type: "number", defaultValue: 5 },
    ];

    fields.forEach(({ key, label, type, defaultValue }) => {
        const div = document.createElement("div");
        const lbl = document.createElement("label");
        lbl.textContent = label;
        lbl.setAttribute("for", `${idPrefix}-${key}`);
        const input = document.createElement("input");
        input.type = type;
        input.id = `${idPrefix}-${key}`;
        input.value = defaultValue;
        div.appendChild(lbl);
        div.appendChild(input);
        wrapper.appendChild(div);
    });
    return wrapper;
}

document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const startBtn = document.getElementById("start-btn");
    const editors = document.getElementById("character-editors");

    // 共通UIで2つのエディタを生成
    const playerEditor = createCharacterEditor(
        "char",
        "プレイヤーキャラクター"
    );
    const enemyEditor = createCharacterEditor("enemy1", "敵キャラクター");
    const groups = document.createElement("div");
    groups.className = "form-groups";
    groups.appendChild(playerEditor);
    groups.appendChild(enemyEditor);
    editors.appendChild(groups);

    function handleBattleStart() {
        output.innerHTML = "";
        // プレイヤー
        const name = document.getElementById("char-name").value;
        const hp = Number(document.getElementById("char-hp").value);
        const atk = Number(document.getElementById("char-atk").value);
        const def = Number(document.getElementById("char-def").value);
        const spd = Number(document.getElementById("char-spd").value);
        const party1 = new Party(1, [new Character(name, hp, atk, def, spd)]);
        // 敵
        const enemyName = document.getElementById("enemy1-name").value;
        const enemyHp = Number(document.getElementById("enemy1-hp").value);
        const enemyAtk = Number(document.getElementById("enemy1-atk").value);
        const enemyDef = Number(document.getElementById("enemy1-def").value);
        const enemySpd = Number(document.getElementById("enemy1-spd").value);
        const party2 = new Party(2, [
            new Character(enemyName, enemyHp, enemyAtk, enemyDef, enemySpd),
        ]);
        // バトル実行
        const battleSequence = new BattleSequence(party1, party2);
        const { result, logs } = battleSequence.execute();
        logs.forEach((log) => {
            const logElement = document.createElement("p");
            logElement.textContent = log;
            output.appendChild(logElement);
        });
        const resultElement = document.createElement("h2");
        resultElement.textContent = `Result: ${
            result === BATTLE_RESULT.PARTY1_WON
                ? "Party 1 Won"
                : result === BATTLE_RESULT.PARTY2_WON
                ? "Party 2 Won"
                : "Draw"
        }`;
        output.appendChild(resultElement);
    }

    startBtn.addEventListener("click", handleBattleStart);
});
