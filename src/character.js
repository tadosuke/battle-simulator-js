/**
 * キャラクターのクラス
 * @param {string} name - キャラクターの名前
 * @param {number} hp - ヒットポイント
 * @param {number} atk - 攻撃力
 * @param {number} def - 防御力
 * @param {number} spd - 速度
 */
export default class Character {
    constructor(name, hp, atk, def, spd) {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spd = spd;
    }
}
