import Party from "./party.js";
import Character from "./character.js";
import { BattleSequence, BATTLE_RESULT } from "./battle-sequence.js";
import { createCharacterEditor } from "./character-editor.js";

/**
 * バトル開始時の処理。フォームからキャラクター情報を取得し、バトルを実行して結果を表示する。
 * @param {HTMLElement} output 結果表示用の要素
 */
export function handleBattleStart(output) {
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

/**
 * 画面初期化処理。キャラクターエディタの生成とイベントリスナーの登録を行う。
 */
function initialize() {
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

    startBtn.addEventListener("click", () => handleBattleStart(output));
}

document.addEventListener("DOMContentLoaded", initialize);
