import Party from "./party.js";

/**
 * 戦闘における1ターンを表すクラス
 * @param {Party} party1 - 戦闘に参加するパーティ1
 * @param {Party} party2 - 戦闘に参加するパーティ2
 */
export default class BattleTurn {
    constructor(party1, party2) {
        this.party1 = party1;
        this.party2 = party2;
    }

    /**
     * ターンを実行する
     */
    execute() {}
}
