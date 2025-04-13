import { BattleSequence, BATTLE_RESULT } from "../src/battle-sequence";
import Party from "../src/party";

describe("BattleSequence", () => {
    test("コンストラクタで渡したパーティーが設定されているか？", () => {
        const party1 = new Party("party1", []);
        const party2 = new Party("party2", []);
        const seq = new BattleSequence(party1, party2);

        expect(seq.party1).toBe(party1);
        expect(seq.party2).toBe(party2);
    });

    test("executeメソッドが BATTLE_RESULT.PARTY1_WON を返すか？", () => {
        const party1 = new Party("party1", []);
        const party2 = new Party("party2", []);
        const seq = new BattleSequence(party1, party2);

        expect(seq.execute()).toBe(BATTLE_RESULT.PARTY1_WON);
    });
});
