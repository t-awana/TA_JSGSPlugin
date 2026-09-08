//=============================================================================
// TA_GoldIconWindowMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Displays an icon in a gold window.
 * @author Tamaki Awana
 * @help Displays an icon in a gold window.
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
 * @param GoldIcon
 * @desc The number of the icon to display in the gold window.
 * @default 314
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゴールドウィンドウにアイコンを表示します。
 * @author 沫那環
 * @help ゴールドウィンドウにアイコンを表示します。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param GoldIcon
 * @type icon
 * @desc ゴールドウィンドウに表示するアイコンの番号です。
 * @default 314
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const goldicon = Number(parameters["GoldIcon"] || 314);

  Window_Gold.prototype.refresh = function () {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    const iw = ImageManager.iconWidth;
    const width2 = iw + this.itemPadding() * 2;
    this.contents.clear();
    this.drawIcon(goldicon, x, y);
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x + width2, y, width - width2);
  };
})();