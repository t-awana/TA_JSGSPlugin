//=============================================================================
// TA_SceneMenuPortrait.js
//=============================================================================
/*:
 * @plugindesc メニュー画面を大幅に改変します。
 * @author Tamaki Awana
 * @help 1〜2人のパーティーに適した形に、メニュー画面を改変します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・顔グラフィックの代わりに、立ち絵を表示します。
 * ・各キャラクターの背景に、ベタ塗りの領域か、
 * 　独自のスキンを表示します。
 * ・TA_TextureBackgroundを導入している場合、
 * 　各キャラクターの背景にテクスチャを
 * 　描写する機能を追加します。
 * ・現在地の名称を表示します。
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラスのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<MenuPortrait:ファイル名>
 * 　立ち絵ファイルを指定します。
 * 　立ち絵ファイルはimg/faceに格納してください。
 * 立ち絵の指定がない場合、
 * 顔グラフィックを表示します。
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
 * @param SceneMenuBackground
 * @desc メニュー画面の背景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param SceneMenuForeground
 * @desc メニュー画面の前景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param MenuCommandWindow
 * @desc メニューコマンドウィンドウの設定です。
 * 
 * @param MCWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューコマンドウィンドウのX座標です。
 * @default 0
 * @parent MenuCommandWindow
 *
 * @param MCWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューコマンドウィンドウのY座標です。
 * @default 96
 * @parent MenuCommandWindow
 *
 * @param MCWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューコマンドウィンドウの横幅です。
 * @default 180
 * @parent MenuCommandWindow
 *
 * @param MCWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューコマンドウィンドウの縦幅です。
 * @default 520
 * @parent MenuCommandWindow
 * 
 * @param MCWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc メニューコマンドウィンドウの透明度です。
 * @default 0
 * @parent MenuCommandWindow
 * 
 * @param MenuStatusWindow
 * @desc メニューステータスウィンドウの設定です。
 * 
 * @param MSWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューステータスウィンドウのX座標です。
 * @default 180
 * @parent MenuStatusWindow
 *
 * @param MSWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューステータスウィンドウのY座標です。
 * @default 72
 * @parent MenuStatusWindow
 *
 * @param MSWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューステータスウィンドウの横幅です。
 * @default 636
 * @parent MenuStatusWindow
 *
 * @param MSWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューステータスウィンドウの縦幅です。
 * @default 552
 * @parent MenuStatusWindow
 * 
 * @param MSWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc メニューステータスウィンドウの透明度です。
 * @default 255
 * @parent MenuStatusWindow
 *
 * @param MenuIndexBackground
 * @desc 各メニューインデックスの背景です。
 * @type select
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @value texture
 * @default filled
 * @parent MenuStatusWindow
 * 
 * @param MenuIndexColor
 * @desc 塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent MenuIndexBackground
 * 
 * @param MenuIndexSkin
 * @desc スキンファイルです。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent MenuIndexBackground
 * 
 * @param MapPlaceWindow
 * @desc 現在地ウィンドウの設定です。
 * 
 * @param MPWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 現在地ウィンドウのX座標です。
 * @default 180
 * @parent MapPlaceWindow
 *
 * @param MPWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 現在地ウィンドウのY座標です。
 * @default 0
 * @parent MapPlaceWindow
 *
 * @param MPWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 現在地ウィンドウの横幅です。
 * @default 444
 * @parent MapPlaceWindow
 *
 * @param MPWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 現在地ウィンドウの縦幅です。
 * @default 72
 * @parent MapPlaceWindow
 * 
 * @param MPWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 現在地ウィンドウの透明度です。
 * @default 255
 * @parent MapPlaceWindow
 * 
 * @param MapPlaceHeader
 * @desc 現在地ウィンドウの見出しです。
 * @default 現在地
 * @parent MapPlaceWindow
 * 
 */
/*:ja
 * @plugindesc メニュー画面を大幅に改変します。
 * @author 沫那環
 * @help 1〜2人のパーティーに適した形に、メニュー画面を改変します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・顔グラフィックの代わりに、立ち絵を表示します。
 * ・各キャラクターの背景に、ベタ塗りの領域か、
 * 　独自のスキンを表示します。
 * ・TA_TextureBackgroundを導入している場合、
 * 　各キャラクターの背景にテクスチャを
 * 　描写する機能を追加します。
 * ・現在地の名称を表示します。
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラスのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<MenuPortrait:ファイル名>
 * 　立ち絵ファイルを指定します。
 * 　立ち絵ファイルはimg/faceに格納してください。
 * 立ち絵の指定がない場合、
 * 顔グラフィックを表示します。
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
 * @param SceneMenuBackground
 * @desc メニュー画面の背景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param SceneMenuForeground
 * @desc メニュー画面の前景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param MenuCommandWindow
 * @desc メニューコマンドウィンドウの設定です。
 * 
 * @param MCWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューコマンドウィンドウのX座標です。
 * @default 0
 * @parent MenuCommandWindow
 *
 * @param MCWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューコマンドウィンドウのY座標です。
 * @default 96
 * @parent MenuCommandWindow
 *
 * @param MCWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューコマンドウィンドウの横幅です。
 * @default 180
 * @parent MenuCommandWindow
 *
 * @param MCWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューコマンドウィンドウの縦幅です。
 * @default 520
 * @parent MenuCommandWindow
 * 
 * @param MCWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc メニューコマンドウィンドウの透明度です。
 * @default 0
 * @parent MenuCommandWindow
 * 
 * @param MenuStatusWindow
 * @desc メニューステータスウィンドウの設定です。
 * 
 * @param MSWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューステータスウィンドウのX座標です。
 * @default 180
 * @parent MenuStatusWindow
 *
 * @param MSWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc メニューステータスウィンドウのY座標です。
 * @default 72
 * @parent MenuStatusWindow
 *
 * @param MSWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューステータスウィンドウの横幅です。
 * @default 636
 * @parent MenuStatusWindow
 *
 * @param MSWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc メニューステータスウィンドウの縦幅です。
 * @default 552
 * @parent MenuStatusWindow
 * 
 * @param MSWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc メニューステータスウィンドウの透明度です。
 * @default 255
 * @parent MenuStatusWindow
 *
 * @param MenuIndexBackground
 * @desc 各メニューインデックスの背景です。
 * @type select
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @value texture
 * @default filled
 * @parent MenuStatusWindow
 * 
 * @param MenuIndexColor
 * @desc 塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent MenuIndexBackground
 * 
 * @param MenuIndexSkin
 * @desc スキンファイルです。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent MenuIndexBackground
 * 
 * @param MapPlaceWindow
 * @desc 現在地ウィンドウの設定です。
 * 
 * @param MPWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 現在地ウィンドウのX座標です。
 * @default 180
 * @parent MapPlaceWindow
 *
 * @param MPWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 現在地ウィンドウのY座標です。
 * @default 0
 * @parent MapPlaceWindow
 *
 * @param MPWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 現在地ウィンドウの横幅です。
 * @default 444
 * @parent MapPlaceWindow
 *
 * @param MPWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 現在地ウィンドウの縦幅です。
 * @default 72
 * @parent MapPlaceWindow
 * 
 * @param MPWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 現在地ウィンドウの透明度です。
 * @default 255
 * @parent MapPlaceWindow
 * 
 * @param MapPlaceHeader
 * @desc 現在地ウィンドウの見出しです。
 * @default 現在地
 * @parent MapPlaceWindow
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var menubg = String(parameters["SceneMenuBackground"] || "");
  var menufg = String(parameters["SceneMenuForeground"] || "");

  var mcwx = Number(parameters["MCWindowX"] || 0);
  var mcwy = Number(parameters["MCWindowY"] || 96);
  var mcwwidth = Number(parameters["MCWindowWidth"] || 180);
  var mcwheight = Number(parameters["MCWindowHeight"] || 520);
  var mcwop = Number(parameters["MCWindowOp"] || 0);

  var menustatusx = Number(parameters["MenuStatusWindowX"] || 180);
  var menustatusy = Number(parameters["MenuStatusWindowY"] || 72);
  var menustatuswidth = Number(parameters["MenuStatusWindowWidth"] || 636);
  var menustatusheight = Number(parameters["MenuStatusWindowHeight"] || 552);
  var menustatusop = Number(parameters["MenuStatusWindowOp"] || 255);

  var mindexbg = String(parameters["MenuIndexBackground"] || "filled");
  var mindexcolor = String(parameters["MenuIndexColor"] || "0, 0, 0, 0.4");
  var mindexskin = String(parameters["MenuIndexSkin"]);

  var mpwx = Number(parameters["MPWindowX"] || 180);
  var mpwy = Number(parameters["MPWindowY"] || 0);
  var mpwwidth = Number(parameters["MPWindowWidth"] || 444);
  var mpwheight = Number(parameters["MPWindowHeight"] || 72);
  var mpwop = Number(parameters["MPWindowOp"] || 255);
  var mapheader = String(parameters["MapPlaceHeader"]);

  WindowLayer.prototype._maskWindow = function(window, shift) {
    this._windowMask.clear();
    this._windowMask.beginFill(0xffffff);
    this._windowMask.drawRect(
        (this.x + shift.x + window.x) + 18,
        (this.y + shift.y + window.y + window.height / 2 * (1 - window._openness / 255)) + 18,
        window.width - 36,
        (window.height * window._openness / 255) - 36
    );
    this._windowMask.endFill();
  };

  //Window_MenuStatus
  Window_MenuStatus.prototype.windowHeight = function () {
    return menustatusheight;
  };

  Window_MenuStatus.prototype.windowWidth = function () {
    return menustatuswidth;
  };

  Window_MenuStatus.prototype.numVisibleRows = function () {
    return 2;
  };

  Window_MenuStatus.prototype.drawContextBackground = function (context, xfix, yfix) {
    var rect = this.itemRect(context);
    var x = rect.x + xfix;
    var y = rect.y + yfix;
    var w = rect.width - xfix * 2;
    var h = rect.height - yfix * 2;
    if (indexbg == "filled") {
      this.contents.fillRect(x, y, w, h, rgba(indexbgcolor));
    } else if (indexbg == "skin") {
       var skinImg = ImageManager.loadSystem(indexbgskin);
      this.contents.blt(skinimg, 0, 0, w, h, x, y, w, h);
    } else if (indexbg == "texture") {
      this.drawTextureBackground(x, y, w, h, 120, 160);
    }
  };

  var _Window_MenuStatus_drawItemBackground = Window_MenuStatus.prototype.drawItemBackground;
  Window_MenuStatus.prototype.drawItemBackground = function (index) {
    this.drawContextBackground(index, 1, 1)
     _Window_MenuStatus_drawItemBackground.call(this, index);
  };

  Window_MenuStatus.prototype.drawItemImage = function (index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    if (actor.meta.MenuPortrait) {
      var portrait = ImageManager.loadFace(actor.meta.MenuPortrait);
      var portraitbitmap = portrait.bitmap;
      this.contents.blt(portrait, rect.x + 1, rect.y + 1, 0, 0, portraitbitmap.width, portraitbitmap.height);
    } else {
      this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
    };
    this.changePaintOpacity(true);
  };

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 266;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

  //Window_MapPlace
  function Window_MapPlace() {
    this.initialize.apply(this, arguments);
  }

  Window_MapPlace.prototype = Object.create(Window_Base.prototype);
  Window_MapPlace.prototype.constructor = Window_MapPlace;

  Window_MapPlace.prototype.initialize = function (x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = mpwop;
    this.refresh();
  };

  Window_MapPlace.prototype.windowWidth = function () {
    return mpwwidth;
  };

  Window_MapPlace.prototype.windowHeight = function () {
    return mpwheight;
  };

  Window_MapPlace.prototype.refresh = function () {
    var width = this.contentsWidth();
    this.contents.clear();
    this.changeTextColor(this.systemColor());
    this.drawText(mapheader, 0, 0, 96);
    this.changeTextColor(this.normalColor());
    this.drawText($gameMap.displayName(), 120, 0, width - 120);
  };

  Window_MapPlace.prototype.open = function () {
    this.refresh();
    Window_Base.prototype.open.call(this);
  };

  //Scene_Menu
  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    _Scene_Menu_create.call(this);
    if (indexbg == "skin") {
      ImageManager.loadSystem(indexbgskin);
    }
    this.createMapPlaceWindow();
    this._commandWindow.x = mcwx;
    this._commandWindow.y = mcwy;
    this._commandWindow.width = mcwwidth;
    this._commandWindow.height = mcwheight;
    this._commandWindow.opacity = mcwop;
    this._statusWindow.x = menustatusx;
    this._statusWindow.y = menustatusy;
    this._statusWindow.opacity = menustatusop;
  };

  Scene_Menu.prototype.createMapPlaceWindow = function () {
    this._mapPlaceWindow = new Window_MapPlace(mpwx, mpwy);
    this.addWindow(this._mapPlaceWindow);
  };
})();
