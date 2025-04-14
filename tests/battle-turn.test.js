import { BattleTurn } from "../src/battle-turn";
import Character from "../src/character";
import Party from "../src/party";

describe("constructor", () => {
    test("渡した引数がメンバーに設定されているか？", () => {
        const party1 = new Party("party1", [new Character("character1")]);
        const party2 = new Party("party2", [new Character("character2")]);

        const turn = new BattleTurn(1, party1, party2);

        expect(turn.party1).toBe(party1);
        expect(turn.party2).toBe(party2);
    });
});

describe("execute", () => {
    test("executeメソッドが正しい値を返すか？", () => {
        const party1 = new Party("party1", [
            new Character("character1", 100, 10, 5, 3),
        ]);
        const party2 = new Party("party2", [
            new Character("character2", 100, 8, 6, 2),
        ]);
        const battleTurn = new BattleTurn(1, party1, party2);

        const { isFinished, logs } = battleTurn.execute();

        expect(isFinished).toBe(false);
        expect(Array.isArray(logs)).toBe(true); // ログが配列であることを確認
    });
});

describe("selectTarget", () => {
    test("敵パーティからHPが正のキャラクターを選択するか？", () => {
        const hero = new Character("Hero", 100, 10, 5, 3);
        const defeatedVillain = new Character("Villain1", 0, 10, 6, 2); // HPが0
        const activeVillain = new Character("Villain2", 50, 10, 6, 2);
        const party1 = new Party("party1", [hero]);
        const party2 = new Party("party2", [defeatedVillain, activeVillain]);
        const battleTurn = new BattleTurn(1, party1, party2);

        const target = battleTurn.selectTarget(hero);

        expect(target).toBe(activeVillain); // 正しいターゲットが選択される
    });

    test("敵パーティに有効なターゲットがいない場合、nullを返すか？", () => {
        const character1 = new Character("Hero", 100, 10, 5, 3);
        const character2 = new Character("Villain", 0, 10, 6, 2); // HPが0
        const party1 = new Party("party1", [character1]);
        const party2 = new Party("party2", [character2]);
        const battleTurn = new BattleTurn(1, party1, party2);

        const target = battleTurn.selectTarget(character1);

        expect(target).toBeNull(); // ターゲットがいない場合はnull
    });
});

describe("processCharacterTurn", () => {
    test("ターゲットに攻撃するか？", () => {
        const character = new Character("character1", 100, 10, 0, 0);
        const target = new Character("target", 100, 10, 0, 0);
        const party1 = new Party("party1", [character]);
        const party2 = new Party("party2", [target]);
        const battleTurn = new BattleTurn(1, party1, party2);

        battleTurn.processCharacterTurn(character);

        expect(target.hp).toBe(90); // ダメージを受けている
    });

    test("HP が 0 の場合、何もしないか？", () => {
        const character = new Character("character1", 0, 10, 5, 3);
        const target = new Character("target", 100, 8, 6, 2);
        const party1 = new Party("party1", [character]);
        const party2 = new Party("party2", [target]);
        const battleTurn = new BattleTurn(1, party1, party2);

        battleTurn.processCharacterTurn(character);

        expect(target.hp).toBe(100); // ダメージを受けていない
    });
});

describe("getCharactersBySpeed", () => {
    test("キャラクターを素早さの降順でソートするか？", () => {
        const character1 = new Character("character1", 100, 10, 10, 10); // speed: 10
        const character2 = new Character("character2", 100, 10, 10, 20); // speed: 20
        const character3 = new Character("character3", 100, 10, 10, 15); // speed: 15
        const party1 = new Party("party1", [character1, character3]);
        const party2 = new Party("party2", [character2]);
        const battleTurn = new BattleTurn(1, party1, party2);

        const sortedCharacters = battleTurn.getCharactersBySpeed();

        expect(sortedCharacters).toEqual([character2, character3, character1]);
    });
});
