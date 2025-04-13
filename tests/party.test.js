import Party from "../src/party";

describe("Party", () => {
    test("コンストラクタで渡した引数がメンバーに設定されているか？", () => {
        const characters = [
            { name: "Hero", hp: 100, atk: 20, def: 10, spd: 5 },
            { name: "Mage", hp: 80, atk: 25, def: 5, spd: 10 },
        ];
        const party = new Party(0, characters);

        expect(party.id).toBe(0);
        expect(party.characters).toEqual(characters);
    });
});
