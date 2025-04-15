import Party from "./party.js";
import Character from "./character.js";
import { BattleSequence, BATTLE_RESULT } from "./battle-sequence.js";
import { createCharacterEditor } from "./character-editor.js";

const MIN_CHAR = 1;
const MAX_CHAR = 4;

function getCharacterValues(prefix, index) {
    const id = index + 1;
    const name = document.getElementById(`${prefix}${id}-name`).value;
    const hp = Number(document.getElementById(`${prefix}${id}-hp`).value);
    const atk = Number(document.getElementById(`${prefix}${id}-atk`).value);
    const def = Number(document.getElementById(`${prefix}${id}-def`).value);
    const spd = Number(document.getElementById(`${prefix}${id}-spd`).value);
    return new Character(name, hp, atk, def, spd);
}

export function handleBattleStart(output) {
    output.innerHTML = "";
    // プレイヤー
    const playerEditors = document.querySelectorAll("#player-editors fieldset");
    const playerChars = [];
    playerEditors.forEach((_, i) => {
        playerChars.push(getCharacterValues("char", i));
    });
    const party1 = new Party(1, playerChars);
    // エネミー
    const enemyEditors = document.querySelectorAll("#enemy-editors fieldset");
    const enemyChars = [];
    enemyEditors.forEach((_, i) => {
        enemyChars.push(getCharacterValues("enemy", i));
    });
    const party2 = new Party(2, enemyChars);
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

function updateButtonStates() {
    const playerEditors = document.getElementById("player-editors");
    const enemyEditors = document.getElementById("enemy-editors");
    const addPlayerBtn = document.getElementById("add-player-btn");
    const removePlayerBtn = document.getElementById("remove-player-btn");
    const addEnemyBtn = document.getElementById("add-enemy-btn");
    const removeEnemyBtn = document.getElementById("remove-enemy-btn");

    const playerCount = playerEditors.children.length;
    const enemyCount = enemyEditors.children.length;

    addPlayerBtn.disabled = playerCount >= MAX_CHAR;
    removePlayerBtn.disabled = playerCount <= MIN_CHAR;
    addEnemyBtn.disabled = enemyCount >= MAX_CHAR;
    removeEnemyBtn.disabled = enemyCount <= MIN_CHAR;
}

function addCharacterEditor(container, prefix, label, count) {
    const editor = createCharacterEditor(
        `${prefix}${count}`,
        label + ` ${count}`
    );
    container.appendChild(editor);
    updateButtonStates();
}

function removeCharacterEditor(container) {
    if (container.children.length > MIN_CHAR) {
        container.removeChild(container.lastElementChild);
    }
    updateButtonStates();
}

function initialize() {
    const output = document.getElementById("output");
    const startBtn = document.getElementById("start-btn");
    const playerEditors = document.getElementById("player-editors");
    const enemyEditors = document.getElementById("enemy-editors");
    const addPlayerBtn = document.getElementById("add-player-btn");
    const removePlayerBtn = document.getElementById("remove-player-btn");
    const addEnemyBtn = document.getElementById("add-enemy-btn");
    const removeEnemyBtn = document.getElementById("remove-enemy-btn");

    // 初期キャラ1体ずつ
    addCharacterEditor(playerEditors, "char", "プレイヤー", 1);
    addCharacterEditor(enemyEditors, "enemy", "エネミー", 1);
    updateButtonStates();

    addPlayerBtn.addEventListener("click", () => {
        const count = playerEditors.children.length;
        if (count < MAX_CHAR) {
            addCharacterEditor(playerEditors, "char", "プレイヤー", count + 1);
        }
    });
    removePlayerBtn.addEventListener("click", () => {
        removeCharacterEditor(playerEditors);
    });
    addEnemyBtn.addEventListener("click", () => {
        const count = enemyEditors.children.length;
        if (count < MAX_CHAR) {
            addCharacterEditor(enemyEditors, "enemy", "エネミー", count + 1);
        }
    });
    removeEnemyBtn.addEventListener("click", () => {
        removeCharacterEditor(enemyEditors);
    });
    startBtn.addEventListener("click", () => handleBattleStart(output));
}

document.addEventListener("DOMContentLoaded", initialize);
