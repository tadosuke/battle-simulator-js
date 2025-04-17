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
     * @returns {{ result: number, logs: string[] }} 戦闘の結果とログ
     */
    execute() {
        // 戦闘が終了するか、ターン数が最大に達するまでループ
        let turnNum = 1;
        let isFinished = false;
        const logs = [];

        do {
            logs.push(`---- ターン ${turnNum} ----`);
            let turn = new BattleTurn(turnNum, this.party1, this.party2);
            const { isFinished: turnFinished, logs: turnLogs } = turn.execute();
            logs.push(...turnLogs);
            isFinished = turnFinished;
            turnNum++;
        } while (!isFinished && turnNum <= this.maxTurnNum);

        // 戦闘の結果を決定
        let result;
        if (this.party1.isDefeated()) {
            result = BATTLE_RESULT.PARTY2_WON;
        } else if (this.party2.isDefeated()) {
            result = BATTLE_RESULT.PARTY1_WON;
        } else {
            result = BATTLE_RESULT.DRAW;
        }

        return { result, logs };
    }
}
