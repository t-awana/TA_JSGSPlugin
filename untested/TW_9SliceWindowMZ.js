//=============================================================================
// TA_9SliceWindowMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Draws the window as 9Slice images.
 * @author Tamaki Awana
 * @help Adds a function to the Window class
 * that can depict various window parts
 * using 9Slice images.
 * Since it is an API type plug-in,
 * knowledge of JavaScript is required to use it.
 * 
 * Plugin Commands:  
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ウィンドウを9Slice画像で描写します。
 * @author 沫那環
 * @help Windowクラスに、9Slice画像を使用した各種ウィンドウ
 * パーツを描写できる機能を追加します。
 * APIタイプのプラグインのため、活用にはJavaScriptの知識が
 * 必要となります。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 */
Window.prototype._refreshBack9slice = function(slice, sliceimg) {
    const m = 0;
    const w = Math.max(0, this._width - m * 2);
    const h = Math.max(0, this._height - m * 2);
    let w2 = slice;
    let h2 = slice;
    if (w > w2) {
      w2 -= 1;
     };
    if (h > h2) {
      h2 -= 1;
    };
    const sprite = this._backSprite;
    sprite.bitmap = sliceimg;
    sprite.setFrame(0, 0, m, m);
    sprite.move(m, m);
    sprite.scale.x = w / w2;
    sprite.scale.y = h / w2;
    sprite.setColorTone(this._colorTone);
};

Window.prototype._refreshFrame9slice = function(slice, sliceimg) {
    const drect = { x: 0, y: 0, width: this._width, height: this._height };
    const m = slice;
    for (const child of this._frameSprite.children) {
        child.bitmap = sliceimg;
    }
    this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
};

Window.prototype._refreshCursor9slice = function(slice, sliceimg) {
    const drect = this._cursorRect.clone();
    const m = slice;
    for (const child of this._cursorSprite.children) {
        child.bitmap = sliceimg;
    }
    this._setRectPartsGeometry(this._cursorSprite, drect, drect, m);
};