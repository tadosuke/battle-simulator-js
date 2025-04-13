import Party from "./party.js";
import { BattleTurn } from "./battle-turn.js";

const MAX_TURN_NUM = 10; // 最大ターン数

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
    constructor(party1, party2, maxTurnNum = MAX_TURN_NUM) {
        this.party1 = party1;
        this.party2 = party2;
        this.maxTurnNum = maxTurnNum;
    }

    /**
     * 戦闘を実行する
     * @returns 戦闘の結果（BATTLE_RESULT）
     */
    execute() {
        // 戦闘が終了するか、ターン数が最大に達するまでループ
        let turnNum = 1;
        let isFinished = false;
        do {
            let turn = new BattleTurn(turnNum, this.party1, this.party2);
            const result = turn.execute();
            isFinished = result.isFinished;
            turnNum++;
        } while (!isFinished && turnNum < MAX_TURN_NUM);

        // 戦闘の結果を返す
        if (this.party1.isDefeated()) {
            return BATTLE_RESULT.PARTY2_WON;
        } else if (this.party2.isDefeated()) {
            return BATTLE_RESULT.PARTY1_WON;
        } else {
            return BATTLE_RESULT.DRAW;
        }
    }
}
