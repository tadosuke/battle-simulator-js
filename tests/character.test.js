import Character from "../src/character";

describe("constructor", () => {
    test("初期化後の状態が正しいか？", () => {
        const character = new Character("Hero", 100, 20, 10, 5);

        expect(character.name).toBe("Hero");
        expect(character.hp).toBe(100);
        expect(character.atk).toBe(20);
        expect(character.def).toBe(10);
        expect(character.spd).toBe(5);
        expect(character.partyId).toBe(undefined);
        expect(character.isDefeated()).toBe(false);
    });
});

describe("selectTarget", () => {
    test("生存しているターゲットが選択されるか？", () => {
        const character = new Character("Hero", 100, 20, 0, 5);
        const enemyParty = {
            characters: [
                new Character("Enemy1", 100, 20, 0, 5),
                new Character("Enemy2", 0, 20, 0, 5),
            ],
        };

        const target = character.selectTarget(enemyParty);

        expect(target.name).toBe("Enemy1");
    });
});

describe("takeDamage", () => {
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
        expect(character.hp).toBe(100);
        expect(damage).toBe(0);
    });
});
