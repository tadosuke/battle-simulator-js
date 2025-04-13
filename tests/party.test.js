import Character from "../src/character";
import Party from "../src/party";

describe("Party", () => {
    test("コンストラクタで渡した引数がメンバーに設定されているか？", () => {
        const hero = new Character("Hero", 100, 20, 10, 5);
        const mage = new Character("Mage", 80, 25, 5, 10);
        const party = new Party(0, [hero, mage]);

        expect(party.id).toBe(0);
        expect(party.characters).toEqual([hero, mage]);
    });
});
