//=============================================================================
// TA_ActorCommandNameWindow.js
//=============================================================================
/*:
 * @plugindesc Show name window on actor commands.
 * @author Tamaki Awana
 * @help In battle scenes, a window displaying the name of the actor
 * currently selecting an action will be displayed next 
 * to the actor command window.
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
 * @param NameWindowXOffset
 * @type number
 * @min -9007
 * @max 9007
 * @desc Correct the X coordinate of the name window.
 * @default 0
 * 
 * @param NameWindowYOffset
 * @type number
 * @min -9007
 * @max 9007
 * @desc Correct the Y coordinate of the name window.
 * @default 0
 * 
 * @param NameWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of the name window.
 * @default 192
 * 
 * @param NameWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of the name window.
 * @default 72
 * 
 * @param NameWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the name window.
 * @default 255
 * 
 * @param NameWindowBG
 * @desc Background image of the name window.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param NameFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc The size of the actor name displayed in the name window.
 * @default 28
 * 
 * @param NameTextX
 * @type number
 * @min -9007
 * @max 9007
 * @desc The X coordinate of the actor name displayed in the name window.
 * @default 0
 * 
 * @param NameTextY
 * @type number
 * @min -9007
 * @max 9007
 * @desc The Y coordinate of the actor name displayed in the name window.
 * @default 0
 * 
 * @param NameTextAlign
 * @desc Sets the alignment of actor names displayed in the name window.
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default left
 * 
 * @param NameWindowOpenAction
 * @type select
 * @option Open move
 * @value openmove
 * @option Stable show
 * @value stableshow
 * @desc Set the behavior when displaying the name window.
 * @default openmove
 * 
 */
/*:ja
 * @plugindesc アクターコマンドに名前ウィンドウを表示します。
 * @author 沫那環
 * @help 戦闘シーンにて、アクターコマンドウィンドウのそばに、
 * 行動選択中のアクターの名前を表示したウィンドウを表示します。
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
 * @param NameWindowXOffset
 * @type number
 * @min -9007
 * @max 9007
 * @desc 名前ウィンドウのX座標を補正します。
 * @default 0
 * 
 * @param NameWindowYOffset
 * @type number
 * @min -9007
 * @max 9007
 * @desc 名前ウィンドウのY座標を補正します。
 * @default 0
 * 
 * @param NameWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 名前ウィンドウの横幅です。
 * @default 192
 * 
 * @param NameWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 名前ウィンドウの縦幅です。
 * @default 72
 * 
 * @param NameWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 名前ウィンドウの透明度です。
 * @default 255
 * 
 * @param NameWindowBG
 * @desc 名前ウィンドウの背景画像です。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param NameFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc 名前ウィンドウに表示されるテキストのフォントサイズです。
 * @default 28
 * 
 * @param NameTextX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 名前ウィンドウに表示されるアクター名のX座標です。
 * @default 0
 * 
 * @param NameTextY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 名前ウィンドウに表示されるアクター名のY座標です。
 * @default 0
 * 
 * @param NameTextAlign
 * @desc 名前ウィンドウに表示されるアクター名の行揃えを設定します。
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option 右
 * @value right
 * @default left
 * 
 * @param NameWindowOpenAction
 * @type select
 * @option 開く動作をつける
 * @value openmove
 * @option そのまま表示する
 * @value stableshow
 * @desc 名前ウィンドウを表示する時の動作を設定します。
 * @default openmove
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var nwxoffs = Number(parameters["NameWindowXOffset"] || 0);
  var nwyoffs = Number(parameters["NameWindowYOffset"] || 0);
  var nwwidth = Number(parameters["NameWindowWidth"] || 192);
  var nwheight = Number(parameters["NameWindowHeight"] || 72);
  var nwop = Number(parameters["NameWindowOp"] || 255);
  var nwbg = String(parameters["NameWindowBG"]);
  var namefs = Number(parameters["NameFontSize"] || 28);
  var nwtxtx = Number(parameters["NameTextX"] || 0);
  var nwtxty = Number(parameters["NameTextY"] || 0);
  var nameali = String(parameters["NameTextAlign"] || "left");
  var nwopac = (parameters["NameWindowOpenAction"] || true);

  
  function Window_ACName() {
    this.initialize(...arguments);
  }

  Window_ACName.prototype = Object.create(Window_Base.prototype);
  Window_ACName.prototype.constructor = Window_ACName;

  Window_ACName.prototype.initialize = function () {
    var x = Graphics.boxWidth;
    var y = Graphics.boxHeight;
    var width = nwwidth;
    var height = nwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this._name = "";
    this._ACWindow = null;
  };

  Window_ACName.prototype.setACWindow = function (acWindow) {
    this._ACWindow = acWindow;
  };

  Window_ACName.prototype.setName = function (name) {
    if (this._name !== name) {
      this._name = name;
      this.refresh();
    }
  };

  Window_ACName.prototype.clear = function () {
    this.setName("");
  };

  Window_ACName.prototype.updatePosition = function () {
    var ACWindow = this._ACWindow;
    this.x = nwxoffs + ACWindow.x;
    this.y = nwyoffs + ACWindow.y - this.height;
  };

  Window_ACName.prototype.standardFontSize = function() {
    return namefs;
  };

  Window_ACName.prototype.refresh = function () {
    this.updatePosition();
    this.contents.clear();
    if (nwbg) {
      var bitmap = ImageManager.loadSystem(nwbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    this.drawText(this._name, nwtxtx, nwtxty, this.contentsWidth(), nameali);
  };

  Window_ACName.prototype.setup = function(name) {
    this.clear();
    this.setName(name);
    this.refresh();
    if (nwopac == "true") {
      this.open();
    } else {
      this.openness = 255;
    }
  };

  Window_ACName.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this._ACWindow.isOpen()) {
      if (nwopac == "true") {
        this.open();
      } else {
        this.openness = 255;
      }
    } else {
      if (nwopac == "true") {
        this.close();
      } else {
        this.openness = 0;
      }
    }
  }

  var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.call(this);
    this.createACNameWindow();
  };

  Scene_Battle.prototype.createACNameWindow = function () {
    if (nwbg) {
      ImageManager.loadSystem(nwbg);
    };
    this._acnameWindow = new Window_ACName();
    this.addWindow(this._acnameWindow);
    this._acnameWindow.setACWindow(this._actorCommandWindow);
    this._acnameWindow.opacity = nwop;
  };

  var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function() {
    if (nwopac == "true") {
    this._acnameWindow.close();
    } else {
      this.openness = 0;
    }
    _Scene_Battle_startPartyCommandSelection.call(this);
  };

  var _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function () {
    _Scene_Battle_startActorCommandSelection.call(this);
    this._acnameWindow.setup(BattleManager.actor().name());
  };

})();
