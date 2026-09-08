//=============================================================================
// TA_GoldIconWindow.js
//=============================================================================
/*:
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
 * @desc ゴールドウィンドウに表示するアイコンの番号です。
 * @default 314
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var goldicon = Number(parameters["GoldIcon"] || 314);

  Window_Gold.prototype.refresh = function () {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawIcon(goldicon, 0, 0);
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
  };
})();
