import { Character } from "./character.js";

/**
 * 複数のキャラクターを含むパーティークラス
 * @param {number} id - パーティーのID
 * @param {Character[]} characters - キャラクターの配列
 */
export default class Party {
    constructor(id, characters) {
        this.id = id; // パーティーのID
        this.characters = characters; // キャラクターの配列
    }

    /**
     * パーティーが全滅しているかを判定する
     * @returns {boolean} - 全滅している場合はtrue、そうでない場合はfalse
     */
    isDefeated() {
        return this.characters.every((character) => character.isDefeated());
    }
}
