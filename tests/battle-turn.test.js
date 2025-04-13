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
        const party1 = new Party("party1", [new Character("character1")]);
        const party2 = new Party("party2", [new Character("character2")]);
        const battleTurn = new BattleTurn(1, party1, party2);

        const isFinished = battleTurn.execute();

        expect(isFinished).toBe(false);
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
