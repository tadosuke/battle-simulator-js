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
        this.partyId = undefined; // 所属パーティー
    }

    /**
     * 行動する
     * @param {Party} enemyParty - 敵パーティー
     * @returns {string[]} ログの配列
     */
    act(enemyParty) {
        const logs = [];

        if (this.hp <= 0) {
            return logs;
        }

        logs.push(`${this.name} の攻撃！`);

        // ターゲットの選択
        const target = this.selectTarget(enemyParty);

        // ターゲットに攻撃
        const damage = target.takeDamage(this.atk);
        logs.push(`${target.name} に ${damage} のダメージ！`);

        if (target.isDefeated()) {
            logs.push(`${target.name} が倒れた`);
        }

        return logs;
    }

    /**
     * ターゲットを選択する
     * @param {Party} enemyParty - 敵パーティー
     * @returns {Character | null} - 選択されたターゲットキャラクター、またはnull（ターゲットがいない場合）
     */
    selectTarget(enemyParty) {
        // パーティー内から生存しているキャラクターをランダムで選択する
        const aliveCharacters = enemyParty.characters.filter((c) => c.hp > 0);
        if (aliveCharacters.length === 0) {
            // 戦闘が終了していないとおかしい
            throw new Error("No alive characters in the enemy party.");
        }

        // ランダムに選択
        const target =
            aliveCharacters[Math.floor(Math.random() * aliveCharacters.length)];

        return target;
    }

    /**
     * ダメージを受ける
     * @param {number} attackPower - 攻撃力
     * @returns {number} - 受けたダメージ
     */
    takeDamage(attackPower) {
        const damage = Math.max(attackPower - this.def, 0);
        this.hp = Math.max(this.hp - damage, 0);
        return damage;
    }

    /**
     * キャラクターが倒されているかを判定する
     * @returns {boolean} - 倒されている場合はtrue、そうでない場合はfalse
     */
    isDefeated() {
        return this.hp <= 0;
    }
}
