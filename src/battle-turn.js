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
     * @returns {{isFinished: boolean, party1: Party, party2: Party}} 戦闘の結果
     */
    execute() {
        const isFinished = false; // 戦闘が終了したかどうかを判定するロジックを追加予定

        // 必要に応じて party1 と party2 の状態を更新するロジックを追加予定

        return {
            isFinished,
            party1: this.party1,
            party2: this.party2,
        };
    }
}
