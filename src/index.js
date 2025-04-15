import Party from "./party.js";
import Character from "./character.js";
import { BattleSequence, BATTLE_RESULT } from "./battle-sequence.js";

document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const startBtn = document.getElementById("start-btn");
    const charNameInput = document.getElementById("char-name");
    const charHpInput = document.getElementById("char-hp");
    const charAtkInput = document.getElementById("char-atk");
    const charDefInput = document.getElementById("char-def");
    const charSpdInput = document.getElementById("char-spd");

    startBtn.addEventListener("click", () => {
        // 出力をクリア
        output.innerHTML = "";

        // フォームから値を取得
        const name = charNameInput.value;
        const hp = Number(charHpInput.value);
        const atk = Number(charAtkInput.value);
        const def = Number(charDefInput.value);
        const spd = Number(charSpdInput.value);

        // ユーザーキャラ1体のパーティ
        const party1 = new Party(1, [new Character(name, hp, atk, def, spd)]);
        // 敵パーティ（固定）
        const party2 = new Party(2, [
            new Character("Enemy1", 100, 15, 8, 7),
            new Character("Enemy2", 90, 18, 6, 9),
        ]);

        // バトル実行
        const battleSequence = new BattleSequence(party1, party2);
        const { result, logs } = battleSequence.execute();

        // ログ表示
        logs.forEach((log) => {
            const logElement = document.createElement("p");
            logElement.textContent = log;
            output.appendChild(logElement);
        });

        // 結果表示
        const resultElement = document.createElement("h2");
        resultElement.textContent = `Result: ${
            result === BATTLE_RESULT.PARTY1_WON
                ? "Party 1 Won"
                : result === BATTLE_RESULT.PARTY2_WON
                ? "Party 2 Won"
                : "Draw"
        }`;
        output.appendChild(resultElement);
    });
});
