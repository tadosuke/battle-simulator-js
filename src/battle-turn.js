import Party from "./party.js";

/**
 * 戦闘における1ターンを表すクラス
 * @param {number} turnNumber - 現在のターン番号
 * @param {Party} party1 - 戦闘に参加するパーティ1
 * @param {Party} party2 - 戦闘に参加するパーティ2
 */
export class BattleTurn {
    constructor(turnNumber, party1, party2) {
        this.turnNumber = turnNumber;
        this.party1 = party1;
        this.party2 = party2;
    }

    /**
     * ターンを実行する
     * @returns {boolean} 戦闘が終了したかどうか
     */
    execute() {
        const charactersBySpeed = this.getCharactersBySpeed();

        for (const character of charactersBySpeed) {
            this.processCharacterTurn(character);

            // どちらかのパーティーが全滅している場合、戦闘終了
            if (this.party1.isDefeated() || this.party2.isDefeated()) {
                return true;
            }
        }

        // 戦闘継続
        return false;
    }

    processCharacterTurn(character) {
        if (character.hp <= 0) {
            return; // HPが0以下のキャラクターは行動できない
        }

        const targetParty =
            character.partyId === this.party1.id ? this.party2 : this.party1;
        const target = targetParty.characters.find((c) => c.hp > 0); // 生存しているキャラクターをターゲットにする

        if (!target) {
            // ターゲットがいない場合、戦闘終了
            return true;
        }

        // キャラクターの行動（例: 攻撃）
        const damage = target.takeDamage(character.atk);
        console.log(
            `${character.name}が${target.name}に${damage}のダメージを与えた`
        );

        if (target.isDefeated()) {
            console.log(`${target.name}が倒れた`);
        }
    }

    // 素早さの高い順にソートした全キャラクターリストを取得する
    getCharactersBySpeed() {
        const allCharacters = [
            ...this.party1.characters,
            ...this.party2.characters,
        ];
        allCharacters.sort((a, b) => b.spd - a.spd);
        return allCharacters;
    }
}
