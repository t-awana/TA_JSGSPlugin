//=============================================================================
// TA_ValueFontFaceBare.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Make the gauge number font the basic font.
 * @author Tamaki Awana
 * @help Just by installing this plugin, the number font of various 
 * gauges will be changed to text font.
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
 * @plugindesc ゲージの数字フォントをすっぴんに。
 * @author 沫那環
 * @help このプラグインを導入するだけで、各種ゲージの数字フォントを
 * 文章フォントに変更します。
 * 
 *【プラグインコマンドについて】
 * プラグインコマンドはありません。
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
 
(() => {
Sprite_Gauge.prototype.valueFontFace = function() {
    return $gameSystem.mainFontFace();
};

Sprite_Gauge.prototype.valueFontSize = function() {
    return $gameSystem.mainFontSize() - 4;
};

Sprite_Gauge.prototype.valueOutlineColor = function() {
    return ColorManager.outlineColor();
};

Sprite_Gauge.prototype.valueOutlineWidth = function() {
    return 3;
};
})();
