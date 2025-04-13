import Party from "./party.js";

// 実行結果
export const BATTLE_RESULT = {
    PARTY1_WON: 0, // パーティ1の勝利
    PARTY2_WON: 1, // パーティ2の勝利
    DRAW: 2, // 引き分け
};

/**
 * 戦闘シーケンスを表すクラス
 * @param {Party} party1 - 戦闘に参加するパーティ1
 * @param {Party} party2 - 戦闘に参加するパーティ2
 */
export class BattleSequence {
    constructor(party1, party2) {
        this.party1 = party1;
        this.party2 = party2;
    }

    /**
     * 戦闘を実行する
     * @returns 戦闘の結果（BATTLE_RESULT）
     */
    execute() {
        return BATTLE_RESULT.PARTY1_WON;
    }
}
