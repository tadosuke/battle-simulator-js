import * as battleTurn from "../src/battle-turn";
import Character from "../src/character";
import Party from "../src/party";

describe("BattleTurn", () => {
    test("コンストラクタで渡した引数がメンバーに設定されているか？", () => {
        const party1 = new Party("party1", [new Character("character1")]);
        const party2 = new Party("party2", [new Character("character2")]);
        const turn = new battleTurn.BattleTurn(1, party1, party2);

        expect(turn.party1).toBe(party1);
        expect(turn.party2).toBe(party2);
    });

    test("executeメソッドが正しいオブジェクトを返すか？", () => {
        const party1 = new Party("party1", [new Character("character1")]);
        const party2 = new Party("party2", [new Character("character2")]);
        const turn = new battleTurn.BattleTurn(1, party1, party2);

        const result = turn.execute();
        expect(result).toEqual({
            isFinished: false,
            party1: party1,
            party2: party2,
        });
    });
});
