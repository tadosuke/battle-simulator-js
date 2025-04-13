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

    test("攻撃力分のダメージを受けるか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        const damage = character.takeDamage(20);
        expect(character.hp).toBe(80);
        expect(damage).toBe(20);
    });

    test("残りHP以上のダメージを受けたとき、HPが0になるか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        const damage = character.takeDamage(120);
        expect(character.isDefeated()).toBe(true);
        expect(character.hp).toBe(0);
        expect(damage).toBe(120);
    });
});
