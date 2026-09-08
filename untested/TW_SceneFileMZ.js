//=============================================================================
// TA_SceneFileMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc セーブ画面のレイアウトを大規模に変更します。
 * @author Tamaki Awana
 * @help セーブファイルの詳細を表示したウィンドウを表示するように、
 * セーブ画面のレイアウトを大規模に変更します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・詳細ウィンドウ内に、最大4人までの戦闘メンバーの
 * 　顔グラフィックと名前とレベルを表示します。
 * ・TA_AdventureNoteを導入している際に、セーブファイル内の
 * 　メインイベントの進行度を記録した変数の値と連動した
 * 　タイトルを表示する機能を実装しています。
 * ・TA_TextureBackgroundを導入している場合、
 * 　セーブファイル一覧ウィンドウの背景にテクスチャを
 * 　描写する機能を追加します。
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
 * @param SceneFileBackground
 * @desc セーブ画面の背景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param SceneFileForeground
 * @desc セーブ画面の前景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param FileListWindow
 * @desc セーブファイル一覧ウィンドウの設定です。
 * 
 * @param FileListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのX座標です。
 * @default 24
 * @parent FileListWindow
 *
 * @param FileListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのY座標です。
 * @default 96
 * @parent FileListWindow
 *
 * @param FileListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの横幅です。
 * @default 120
 * @parent FileListWindow
 *
 * @param FileListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの縦幅です。
 * @default 420
 * @parent FileListWindow
 * 
 * @param FileListWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル一覧ウィンドウの透明度です。
 * @default 0
 * @parent FileListWindow
 * 
 * @param FileHeader
 * @desc セーブファイルの接頭語です。
 * @default File 
 * @parent FileListWindow
 * 
 * @param FileListBackground
 * @desc 各セーブファイルの背景です。
 * @type select
 * @option なし
 * @value none
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @value texture
 * @default filled
 * @parent FileListWindow
 * 
 * @param FileIndexColor
 * @desc 各セーブファイルの塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent FileListBackground
 * 
 * @param FileIndexSkin
 * @desc 各セーブファイルのスキンファイルを設定します 。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent FileListBackground
 *
 * @param FileIndexs
 * @type number
 * @min 1
 * @max 9007
 * @desc セーブファイル一覧ウィンドウに一度に表示するセーブファイルの数です。
 * @default 8
 * @parent FileListWindow
 * 
 * @param FileStatusWindow
 * @desc セーブファイル詳細ウィンドウの設定です。
 * 
 * @param FileStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル詳細ウィンドウのX座標です。
 * @default 200
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル詳細ウィンドウのY座標です。
 * @default 96
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル詳細ウィンドウの横幅です。
 * @default 400
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル詳細ウィンドウの縦幅です。
 * @default 420
 * @parent FileStatusWindow
 * 
 * @param FileStatusWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル詳細ウィンドウの透明度です。
 * @default 255
 * @parent FileStatusWindow
 *
 * @param MapPlaceHeader
 * @desc セーブデータの現在地の見出しです。
 * @default 現在地
 * @parent FileStatusWindow
 * 
 * @param MoneyHeader
 * @desc セーブデータの所持金の見出しです。
 * @default 所持金
 * @parent FileStatusWindow 
 * 
 * @param NoDataText
 * @desc セーブファイルがない時に表示するテキストです。
 * @default NO DATA
 * @parent FileStatusWindow
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc セーブ画面のレイアウトを大規模に変更します。
 * @author 沫那環
 * @help セーブファイルの詳細を表示したウィンドウを表示するように、
 * セーブ画面のレイアウトを大規模に変更します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・詳細ウィンドウ内に、最大4人までの戦闘メンバーの
 * 　顔グラフィックと名前とレベルを表示します。
 * ・TA_AdventureNoteを導入している際に、セーブファイル内の
 * 　メインイベントの進行度を記録した変数の値と連動した
 * 　タイトルを表示する機能を実装しています。
 * ・TA_TextureBackgroundを導入している場合、
 * 　セーブファイル一覧ウィンドウの背景にテクスチャを
 * 　描写する機能を追加します。
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
 * @param SceneFileBackground
 * @desc セーブ画面の背景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param SceneFileForeground
 * @desc セーブ画面の前景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 * 
 * @param FileListWindow
 * @desc セーブファイル一覧ウィンドウの設定です。
 * 
 * @param FileListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのX座標です。
 * @default 24
 * @parent FileListWindow
 *
 * @param FileListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのY座標です。
 * @default 96
 * @parent FileListWindow
 *
 * @param FileListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの横幅です。
 * @default 120
 * @parent FileListWindow
 *
 * @param FileListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの縦幅です。
 * @default 420
 * @parent FileListWindow
 * 
 * @param FileListWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル一覧ウィンドウの透明度です。
 * @default 0
 * @parent FileListWindow
 * 
 * @param FileHeader
 * @desc セーブファイルの接頭語です。
 * @default File 
 * @parent FileListWindow
 * 
 * @param FileListBackground
 * @desc 各セーブファイルの背景です。
 * @type select
 * @option なし
 * @value none
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @value texture
 * @default filled
 * @parent FileListWindow
 * 
 * @param FileIndexColor
 * @desc 各セーブファイルの塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent FileListBackground
 * 
 * @param FileIndexSkin
 * @desc 各セーブファイルのスキンファイルを設定します 。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent FileListBackground
 *
 * @param FileIndexs
 * @type number
 * @min 1
 * @max 9007
 * @desc セーブファイル一覧ウィンドウに一度に表示するセーブファイルの数です。
 * @default 8
 * @parent FileListWindow
 * 
 * @param FileStatusWindow
 * @desc セーブファイル詳細ウィンドウの設定です。
 * 
 * @param FileStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル詳細ウィンドウのX座標です。
 * @default 200
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル詳細ウィンドウのY座標です。
 * @default 96
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル詳細ウィンドウの横幅です。
 * @default 400
 * @parent FileStatusWindow
 *
 * @param FileStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル詳細ウィンドウの縦幅です。
 * @default 420
 * @parent FileStatusWindow
 * 
 * @param FileStatusWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル詳細ウィンドウの透明度です。
 * @default 255
 * @parent FileStatusWindow
 *
 * @param MapPlaceHeader
 * @desc セーブデータの現在地の見出しです。
 * @default 現在地
 * @parent FileStatusWindow
 * 
 * @param MoneyHeader
 * @desc セーブデータの所持金の見出しです。
 * @default 所持金
 * @parent FileStatusWindow 
 * 
 * @param NoDataText
 * @desc セーブファイルがない時に表示するテキストです。
 * @default NO DATA
 * @parent FileStatusWindow
 * 
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  function StructConvert(basestruct) {
    return JSON.parse(
      JSON.stringify(basestruct, function (key, value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          try {
            return eval(value);
          } catch (e) {
            return value;
          }
        }
      })
    );
  }

  const filebg = String(parameters["SceneFileBackground"] || "");
  const filefg = String(parameters["SceneFileForeground"] || "");

  const filelistx = Number(parameters["FileListWindowX"] || 24);
  const filelisty = Number(parameters["FileListWindowY"] || 96);
  const filelistwidth = Number(parameters["FileListWindowWidth"] || 120);
  const filelistheight = Number(parameters["FileListWindowHeight"] || 420);
  const filelistop = Number(parameters["FileListWindowOp"] || 0);

  const fileheader = String(parameters["FileHeader"]);

  const filelistbg = String(parameters["FileListBackground"] || "filled");
  const fileindexcolor = String(parameters["FileIndexColor"] || "0, 0, 0, 0.4");
  const fileindexskin = String(parameters["FileIndexSkin"]);

  const fileindexs = Number(parameters["FileIndexs"] || 8);

  const filestatusx = Number(parameters["FileStatusWindowX"] || 200);
  const filestatusy = Number(parameters["FileStatusWindowY"] || 96);
  const filestatuswidth = Number(parameters["FileStatusWindowWidth"] || 400);
  const filestatusheight = Number(parameters["FileStatusWindowHeight"] || 420);
  const filestatusop = Number(parameters["FileStatusWindowOp"] || 255);

  const mapheader = String(parameters["MapPlaceHeader"]);
  const moneyheader = String(parameters["MoneyHeader"]);
  const nodatatext = String(parameters["NoDataText"]);

  const param_ADVN = PluginManager.parameters("TA_AdventureNote");
  const ADVNison = Object.keys(param_ADVN).length > 0;
  const mevbase = (param_ADVN["MainEvents"]);
  const mainevent = StructConvert(mevbase);
  const metv = Number(param_ADVN["MainEventVariable"]);

  //DataManager
  var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    var info = _DataManager_makeSavefileInfo.call(this);
    info.name = $gameParty.nameForSavefile();
    info.level = $gameParty.levelForSavefile();
    info.mapName = $gameMap.displayName();
    info.epid = $gameVariables.value(metv);
    info.gold = $gameParty._gold;
    return info;
  };

  //Game_Party
  Game_Party.prototype.nameForSavefile = function () {
    return this.battleMembers().map(function (actor) {
      return [actor.name()];
    });
  };

  Game_Party.prototype.levelForSavefile = function () {
    return this.battleMembers().map(function (actor) {
      return [actor.level];
    });
  };

  Game_Party.prototype.charactersForSavefile = function () {
    return this.battleMembers().map(function (actor) {
      return [actor.characterName(), actor.characterIndex()];
    });
  };

  //Window_SavefileList
  Window_SavefileList.prototype.itemHeight = function () {
    return this.lineHeight();
  };

  Window_SavefileList.prototype.maxVisibleItems = function() {
    return fileindexs;
  };

  Window_SavefileList.prototype.drawContextBackground = function (context, xfix, yfix) {
    const rect = this.itemRect(context);
    const x = rect.x + xfix;
    const y = rect.y + yfix;
    const w = rect.width - xfix * 2;
    const h = rect.height - yfix * 2;
    if (indexbg == "filled") {
      this.contents.fillRect(x, y, w, h, rgba(indexbgcolor));
    } else if (indexbg == "skin") {
       const skinImg = ImageManager.loadSystem(indexbgskin);
      this.contents.blt(skinimg, 0, 0, w, h, x, y, w, h);
    } else if (indexbg == "texture") {
      this.drawTextureBackground(x, y, w, h, 120, 160);
    }
  };

  Window_SavefileList.prototype.drawItem = function (index) {
    const id = index;
    const valid = DataManager.isThisGameFile(id);
    const rect = this.itemRect(index);
    this.drawContextBackground(index, 1, 1)
    this.resetTextColor();
    if (this._mode === "load") {
      this.changePaintOpacity(valid);
    }
    this.drawFileId(id, rect.x + 4, rect.y + 4);
  }

  Window_SavefileList.prototype.drawFileId = function (id, x, y) {
    if (DataManager.isAutoSaveFileId(id)) {
      if (this._mode === 'save') {
        this.changePaintOpacity(false);
      }
      this.drawText(TextManager.file, x, y, 96);
      this.drawText(id + '(Auto)', x, y, 120, 'right');
    } else {
      this.drawText(TextManager.file, x, y, 96);
      this.drawText(id, x, y, 120, 'right');
    }
  };

  //Window_SavefileStatus
  function Window_SavefileStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
  Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

  Window_SavefileStatus.prototype.setMode = function (mode) {
    this._mode = mode;
  };

  Window_SavefileStatus.prototype.setId = function (id) {
    this._id = id;
    this.refresh();
  };

  Window_SavefileStatus.prototype.refresh = function () {
    this.contents.clear();
    const id = this._id;
    const valid = DataManager.isThisGameFile(id);
    const info = DataManager.loadSavefileInfo(id);
    const rect = this.contents.rect;
    this.resetTextColor();
    if (info) {
      this.drawFileId(id, rect.x + 8, rect.y);
      this.drawContents(info, rect, valid);
      this.changePaintOpacity(true);
    } else {
      this.drawText(
        nodatatext, rect.x, rect.y + rect.height / 2 - this.lineHeight(), rect.width, "center");
    }
  };

  Window_SavefileStatus.prototype.drawFileId = function (id, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.file + " " + id, x, y, 180);
    this.resetTextColor();
  };

  Window_SavefileStatus.prototype.drawContents = function (info, rect, valid) {
    var result = mainevent.filter(function ({ MainEventValue }) {
      return MainEventValue <= info.epid;
    });
    var epname = result[result.length - 1].MainEventTitle;
    if (valid) {
      this.drawPartyfaces(info, rect.x, rect.y + this.lineHeight() * 3);
      this.drawPartyLevel(info, rect.x + 164, rect.y + this.lineHeight() * 3);
      this.drawPartyName(info, rect.x + 264, rect.y + this.lineHeight() * 3);
      this.changeTextColor(this.systemColor());
      this.drawText(mapheader, rect.x + 8, rect.y + this.lineHeight() * 10, rect.width);
      this.drawText(moneyheader, rect.x + 8, rect.y + this.lineHeight() * 11, rect.width);
      this.drawText(this.currencyUnit(), rect.x, rect.y + this.lineHeight() * 11, rect.width, "right");
      this.drawText(epname, rect.x, rect.y + this.lineHeight(), rect.width - 2, 'right');
      this.resetTextColor();
      this.drawText(info.mapName, rect.x + 94, rect.y + this.lineHeight() * 10, rect.width - 96, "right");
      this.drawText(info.gold, rect.x, rect.y + this.lineHeight() * 11, rect.width - 32, "right");
      this.drawText(info.playtime, rect.x-4, rect.y, rect.width, "right");
      this.drawHorzLine(this.lineHeight() * 2);
      this.drawHorzLine(this.lineHeight() * 9);
    }
  };

  Window_SavefileStatus.prototype.drawHorzLine = function (y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
  };

  Window_SavefileStatus.prototype.drawPartyfaces = function (info, x, y) {
    if (info && info.faces) {
      for (let i = 0; i < info.faces.length; i++) {
        const data = info.faces[i];
        this.drawFace(data[0], data[1], x, y + i * 58, 144, 48);
      }
    }
  };

  Window_SavefileStatus.prototype.drawPartyName = function (info, x, y) {
    if (info && info.name) {
      for (let i = 0; i < info.name.length; i++) {
        const data = info.name[i];
        this.drawText(data, x, y + (i * 58) + 6, 180);
      }
    }
  };

  Window_SavefileStatus.prototype.drawPartyLevel = function (info, x, y) {
    if (info && info.level) {
      for (let i = 0; i < info.name.length; i++) {
        const data = info.level[i];
        this.changeTextColor(this.systemColor());
        this.drawText("Lv.", x, y + (i * 58) + 6, 48);
        this.resetTextColor();
        this.drawText(data, x, y + (i * 58) + 6, 72, "right");
      }
    }
  };

  Window_SavefileStatus.prototype.currencyUnit = function () {
    return TextManager.currencyUnit;
  };

  //Scene_File
  var _Scene_File_createBackground = Scene_File.prototype.createBackground;
  Scene_File.prototype.createBackground = function () {
    _Scene_File_createBackground.call(this);
    this._filebackgroundSprite = new Sprite();
    this._fileforegroundSprite.bitmap = ImageManager.loadSystem(filebg);
    this.addChild(this._filebackgroundSprite);
    this._fileforegroundSprite = new Sprite();
    this._fileforegroundSprite.bitmap = ImageManager.loadSystem(filefg);
    this.addChild(this._fileforegroundSprite);
  };

  var _Scene_File_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function () {
    _Scene_File_create.call(this);
    if (indexbg == "skin") {
      ImageManager.loadSystem(indexbgskin);
    }
  };

  Scene_File.prototype.createListWindow = function () {
    const x = filelistx;
    const y = filelisty;
    const width = filelistwidth;
    const height = filelistheight;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.opacity = filelistop;
    this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
    this._listWindow.statusWindow = this._statusWindow;
    this._listWindow.callUpdateHelp();
  };

  Scene_File.prototype.createStatusWindow = function () {
    const x = filestatusx;
    const y = filestatusy;
    const width = filestatuswidth;
    const height = filestatusheight;
    this._statusWindow = new Window_SavefileStatus(x, y, width, height);
    this._statusWindow.setMode(this.mode());
    this._statusWindow.opacity = filestatusop;
    this._listWindow.setMode(this.mode());
    this.addWindow(this._statusWindow);
    this._statusWindow.refresh();
  };

  var _Scene_File_start = Scene_File.prototype.start;
  Scene_File.prototype.start = function () {
    _Scene_File_start.call(this);
    this._listWindow.ensureCursorVisible();
    this._listWindow.callUpdateHelp();
  };
})();