//=============================================================================
// TA_SceneGameEndNotionMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Displays a notion window at the end scene.
 * @author Tamaki Awana
 * @help Displays a notion window at the end scene.
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
 * @param EndNotionWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of the end notion window.
 * @default 0
 * 
 * @param EndNotionWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of the end notion window.
 * @default 0
 * 
 * @param EndNotionWindowWidth
 * @min 0
 * @max 9007
 * @desc Width of the end notion window.
 * @default 816
 * 
 * @param EndNotionWindowHeight
 * @min 0
 * @max 9007
 * @desc Height of the end notion window.
 * @default 72
 * 
 * @param EndNotionWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the end notion window.
 * @default 255
 * 
 * @param EndNotionWindowBG
 * @desc Background of the end notion window.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param EndNotionTextFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc Font size of the text in the end notion window.
 * @default 28
 * 
 * @param EndNotionText
 * @desc The text to display in the end notion window.
 * @type note
 * @default Exit the game and return to the title screen?
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 終了シーンに警告ウィンドウを表示します。
 * @author 沫那環
 * @help 終了シーンに警告ウィンドウを表示します。
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
 * @param EndNotionWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 終了警告ウィンドウのX座標です。
 * @default 0
 * 
 * @param EndNotionWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 終了警告ウィンドウのY座標です。
 * @default 0
 * 
 * @param EndNotionWindowWidth
 * @min 0
 * @max 9007
 * @desc 終了警告ウィンドウの横幅です。
 * @default 816
 * 
 * @param EndNotionWindowHeight
 * @min 0
 * @max 9007
 * @desc 終了警告ウィンドウの縦幅です。
 * @default 72
 * 
 * @param EndNotionWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 終了警告ウィンドウの透明度です。
 * @default 255
 * 
 * @param EndNotionWindowBG
 * @desc 終了警告ウィンドウの背景画像です。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param EndNotionTextFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc 終了警告ウィンドウに表示されるテキストのフォントサイズです。
 * @default 28
 * 
 * @param EndNotionText
 * @desc 終了警告ウィンドウに表示するテキストです。
 * @type note
 * @default ゲームを終了して、タイトル画面へ戻りますか？
 * 
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const enwx = Number(parameters["EndNotionWindowX"] || 0);
  const enwy = Number(parameters["EndNotionWindowY"] || 0);
  const enwwidth = Number(parameters["EndNotionWindowWidth"] || 816);
  const enwheight = Number(parameters["EndNotionWindowHeight"] || 72);
  const enwop = Number(parameters["EndNotionWindowOp"] || 255);
  const enwbg = String(parameters["EndNotionWindowBG"]);
  const entfs = Number(parameters["EndNotionTextFontSize"] || 28);
  const etxt = String(parameters["EndNotiontext"]);

  function Window_EndNotion() {
    this.initialize(...arguments);
  }

  Window_EndNotion.prototype = Object.create(Window_Base.prototype);
  Window_EndNotion.prototype.constructor = Window_EndNotion;

  Window_EndNotion.prototype.initialize = function () {
    const x = enwx;
    const y = enwy;
    const width = enwwidth;
    const height = enwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = "";
  };

  Window_EndNotion.prototype.setENText = function (text) {
    if (this._text !== text) {
      this._text = text;
      this.refresh();
    }
  };

  Window_EndNotion.prototype.clear = function () {
    this.setText("");
  };

  Window_EndNotion.prototype.standardFontSize = function() {
    return entfs;
  };

  Window_EndNotion.prototype.refresh = function () {
    this.contents.clear();
    if (enwbg) {
      const bitmap = ImageManager.loadSystem(enwbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    this.drawTextEx(this._text, 0, 0, this.contentsWidth());
  };

  Window_EndNotion.prototype.setup = function(text) {
    this.clear();
    this.setText(text);
    this.refresh();
  };

  const _Scene_GameEnd_create = Scene_GameEnd.prototype.create;
  Scene_GameEnd.prototype.create = function () {
    _Scene_GameEnd_create.call(this);
    this.createEndNotionWindow();
  };

  Scene_GameEnd.prototype.createEndNotionWindow = function () {
    if (enwbg) {
      ImageManager.loadSystem(enwbg);
    };
    this._EndNotionWindow = new Window_EndNotion();
    this.addWindow(this._EndNotionWindow);
    this._EndNotionWindow.opacity = enwop;
  };
})();
