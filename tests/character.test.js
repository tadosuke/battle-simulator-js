import Character from "../src/character";

describe("Character", () => {
    test("初期化後の状態が正しいか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        expect(character.name).toBe("Hero");
        expect(character.hp).toBe(100);
        expect(character.atk).toBe(20);
        expect(character.def).toBe(10);
        expect(character.spd).toBe(5);
        expect(character.partyId).toBe(undefined);
    });

    test("残りHP以上のダメージを受けたとき、HPが0になるか？", () => {
        const character = new Character("Hero", 100, 20, 0, 5);

        const damage = character.takeDamage(120);
        expect(character.isDefeated()).toBe(true);
        expect(character.hp).toBe(0);
        expect(damage).toBe(120);
    });

    test("防御力を考慮したダメージ計算が正しいか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        const damage = character.takeDamage(15);
        expect(character.hp).toBe(95); // 15 - 10 = 5 damage
        expect(damage).toBe(5);
    });

    test("防御力が攻撃力以上の場合、ダメージが0になるか？", () => {
        const character = new Character("Hero", 100, 20, 25, 5);

        const damage = character.takeDamage(20);
        expect(character.hp).toBe(100); // No damage taken
        expect(damage).toBe(0);
    });
});
