// キャラクターエディタ生成関数を分離
/**
 * キャラクターエディタを作成する関数。
 * 指定されたIDプレフィックスとラベルに基づいて、キャラクターの属性を入力するためのフォーム要素を生成します。
 *
 * @param {string} idPrefix - 各入力フィールドのIDに使用するプレフィックス。
 *                            例: "char" または "enemy"。
 * @param {string} label - フォームのラベルとして表示される文字列。
 * @returns {HTMLFieldSetElement} キャラクターエディタを含むフィールドセット要素。
 */
export function createCharacterEditor(idPrefix, label) {
    const wrapper = document.createElement("fieldset");
    wrapper.className = "form-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    wrapper.appendChild(legend);

    const fields = [
        {
            key: "name",
            label: "名前",
            type: "text",
            defaultValue: idPrefix === "char" ? "Hero" : "Enemy",
        },
        { key: "hp", label: "HP", type: "number", defaultValue: 100 },
        { key: "atk", label: "攻撃力", type: "number", defaultValue: 20 },
        { key: "def", label: "防御力", type: "number", defaultValue: 10 },
        { key: "spd", label: "素早さ", type: "number", defaultValue: 5 },
    ];

    fields.forEach(({ key, label, type, defaultValue }) => {
        const div = document.createElement("div");
        const lbl = document.createElement("label");
        lbl.textContent = label;
        lbl.setAttribute("for", `${idPrefix}-${key}`);
        const input = document.createElement("input");
        input.type = type;
        input.id = `${idPrefix}-${key}`;
        input.value = defaultValue;
        div.appendChild(lbl);
        div.appendChild(input);
        wrapper.appendChild(div);
    });
    return wrapper;
}
