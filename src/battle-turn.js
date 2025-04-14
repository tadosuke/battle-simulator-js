import Party from "./party.js";

/**
 * 戦闘における1ターンを表すクラス
 * @param {number} turnNumber - 現在のターン番号
 * @param {Party} party1 - 戦闘に参加するパーティ1
 * @param {Party} party2 - 戦闘に参加するパーティ2
 */
export class BattleTurn {
    constructor(turnNumber, party1, party2) {
        this.turnNumber = turnNumber;
        this.party1 = party1;
        this.party2 = party2;
    }

    /**
     * ターンを実行する
     * @returns {{ isFinished: boolean, logs: string[] }} 戦闘が終了したかどうかとログ
     */
    execute() {
        const charactersBySpeed = this.getCharactersBySpeed();
        const logs = [];

        for (const character of charactersBySpeed) {
            logs.push(...this.processCharacterTurn(character));

            // どちらかのパーティーが全滅している場合、戦闘終了
            if (this.party1.isDefeated() || this.party2.isDefeated()) {
                return { isFinished: true, logs };
            }
        }

        // 戦闘継続
        return { isFinished: false, logs };
    }

    /**
     * ターゲットを選択する
     * @param {Character} character - 攻撃者キャラクター
     * @returns {Character|null} ターゲットキャラクター、またはnull（ターゲットがいない場合）
     */
    selectTarget(character) {
        const targetParty =
            character.partyId === this.party1.id ? this.party2 : this.party1;
        return targetParty.characters.find((c) => c.hp > 0) || null;
    }

    /**
     * キャラクターのターンを処理する
     * @param {Character} character
     * @returns {string[]} ログの配列
     */
    processCharacterTurn(character) {
        const logs = [];

        const enemyParty =
            character.partyId === this.party1.id ? this.party2 : this.party1;
        const actionLogs = character.act(enemyParty);
        logs.push(...actionLogs);

        return logs;
    }

    /**
     * 素早さの高い順にソートした全キャラクターの配列を取得する
     * @returns {Character[]} 素早さの高い順にソートされたキャラクターの配列
     */
    getCharactersBySpeed() {
        const allCharacters = [
            ...this.party1.characters,
            ...this.party2.characters,
        ];
        allCharacters.sort((a, b) => b.spd - a.spd);
        return allCharacters;
    }
}
