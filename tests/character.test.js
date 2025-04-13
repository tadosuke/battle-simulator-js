import Character from "../src/character";

describe("Character", () => {
    test("コンストラクタで渡した引数がメンバーに設定されているか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        expect(character.name).toBe("Hero");
        expect(character.hp).toBe(100);
        expect(character.atk).toBe(20);
        expect(character.def).toBe(10);
        expect(character.spd).toBe(5);
    });
});
