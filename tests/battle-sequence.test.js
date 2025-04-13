import { BattleSequence, BATTLE_RESULT } from "../src/battle-sequence";
import Party from "../src/party";
import Character from "../src/character";

describe("BattleSequence", () => {
    test("コンストラクタで渡したパーティーが設定されているか？", () => {
        const character1 = new Character("Hero", 100, 10, 5, 3);
        const character2 = new Character("Villain", 100, 8, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const seq = new BattleSequence(party1, party2);

        expect(seq.party1).toBe(party1);
        expect(seq.party2).toBe(party2);
    });

    test("最大ターン数が経過しても決着が付かない場合、引き分けになるか？", () => {
        const character1 = new Character("Hero", 100, 10, 5, 3);
        const character2 = new Character("Villain", 100, 8, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const maxTurnNum = 2;
        const seq = new BattleSequence(party1, party2, maxTurnNum);

        const result = seq.execute();
        expect(result).toBe(BATTLE_RESULT.DRAW);
    });
});
