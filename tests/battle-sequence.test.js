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

    test("パーティー1の方が強い場合、パーティー1が勝利して戦闘が終了するか？", () => {
        const character1 = new Character("Hero", 100, 20, 5, 3);
        const character2 = new Character("Villain", 50, 10, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const maxTurnNum = 10;
        const seq = new BattleSequence(party1, party2, maxTurnNum);

        const { result } = seq.execute();
        expect(result).toBe(BATTLE_RESULT.PARTY1_WON);
    });

    test("パーティー2の方が強い場合、パーティー2が勝利して戦闘が終了するか？", () => {
        const character1 = new Character("Hero", 50, 10, 5, 3);
        const character2 = new Character("Villain", 100, 20, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const maxTurnNum = 10;
        const seq = new BattleSequence(party1, party2, maxTurnNum);

        const { result } = seq.execute();
        expect(result).toBe(BATTLE_RESULT.PARTY2_WON);
    });

    test("最大ターン数が経過しても決着が付かない場合、引き分けになるか？", () => {
        const character1 = new Character("Hero", 100, 10, 5, 3);
        const character2 = new Character("Villain", 100, 8, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const maxTurnNum = 2;
        const seq = new BattleSequence(party1, party2, maxTurnNum);

        const { result } = seq.execute();
        expect(result).toBe(BATTLE_RESULT.DRAW);
    });

    test("戦闘ログが正しく集計されるか？", () => {
        const character1 = new Character("Hero", 100, 20, 5, 3);
        const character2 = new Character("Villain", 50, 10, 6, 2);
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const maxTurnNum = 10;
        const seq = new BattleSequence(party1, party2, maxTurnNum);

        const { result, logs } = seq.execute();

        console.log("戦闘ログ:", logs);
        expect(result).toBe(BATTLE_RESULT.PARTY1_WON);
        expect(logs.length).toBeGreaterThan(0); // ログが存在することを確認
    });
});
