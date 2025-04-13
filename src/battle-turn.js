import Party from "./party.js";

// 実行結果
export const TURN_RESULT = {
    CONTINUE: 0, // 継続中
    PARTY1_WON: 1, // パーティ1の勝利
    PARTY2_WON: 2, // パーティ2の勝利
    DRAW: 3, // 引き分け
};

/**
 * 戦闘における1ターンを表すクラス
 * @param {Party} party1 - 戦闘に参加するパーティ1
 * @param {Party} party2 - 戦闘に参加するパーティ2
 */
export class BattleTurn {
    constructor(party1, party2) {
        this.party1 = party1;
        this.party2 = party2;
    }

    /**
     * ターンを実行する
     * @returns 戦闘の結果（TURN_RESULT）
     */
    execute() {
        return TURN_RESULT.CONTINUE;
    }
}
