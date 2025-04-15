import Party from "./party.js";
import Character from "./character.js";
import { BattleSequence, BATTLE_RESULT } from "./battle-sequence.js";

document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    // Create characters and parties
    const party1 = new Party(1, [
        new Character("Hero", 100, 20, 10, 5),
        new Character("Mage", 80, 25, 5, 10),
    ]);
    const party2 = new Party(2, [
        new Character("Enemy1", 100, 15, 8, 7),
        new Character("Enemy2", 90, 18, 6, 9),
    ]);

    // Execute battle sequence
    const battleSequence = new BattleSequence(party1, party2);
    const { result, logs } = battleSequence.execute();

    // Display logs
    logs.forEach((log) => {
        const logElement = document.createElement("p");
        logElement.textContent = log;
        output.appendChild(logElement);
    });

    // Display result
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
