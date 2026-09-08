//=============================================================================
// TA_SceneFileSlimMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc セーブ・ロード画面のレイアウトを大規模に変更します。
 * @author Tamaki Awana
 * @help セーブ・ロード画面のレイアウトを大規模に変更します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・各リスト項目に、先頭のキャラクター1名のみの
 * 　顔グラと名前を表示します。
 * ・TA_TextureBackgroundを導入している場合、
 * 　セーブファイルウィンドウの背景にテクスチャを描写する
 * 　機能を追加します。
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
 * @param FileListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのX座標です。
 * @default 96
 *
 * @param FileListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのY座標です。
 * @default 96
 *
 * @param FileListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの横幅です。
 * @default 520
 *
 * @param FileListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの縦幅です。
 * @default 480
 * 
 * @param FileListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル一覧ウィンドウの透明度です。
 * @default 0
 * 
 * @param FileHeader
 * @desc セーブファイルの接頭語です。
 * @default File 
 * 
 * @param FileListBackground
 * @desc 各セーブファイルの背景です。
 * @type select
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @default filled
 * @value texture
 *
 * @param FileIndexColor
 * @desc 塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent FileListBackground
 * 
 * @param FileIndexSkin
 * @desc スキンファイルを設定します。
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
 * 
 * @param NoDataText
 * @desc セーブファイルがない時に表示するテキストです。
 * @default NO DATA
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc セーブ・ロード画面のレイアウトを大規模に変更します。
 * @author 沫那環
 * @help セーブ・ロード画面のレイアウトを大規模に変更します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・各リスト項目に、先頭のキャラクター1名のみの
 * 　顔グラと名前を表示します。
 * ・TA_TextureBackgroundを導入している場合、
 * 　セーブファイルウィンドウの背景にテクスチャを描写する
 * 　機能を追加します。
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
 * @param FileListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのX座標です。
 * @default 96
 *
 * @param FileListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc セーブファイル一覧ウィンドウのY座標です。
 * @default 96
 *
 * @param FileListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの横幅です。
 * @default 520
 *
 * @param FileListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc セーブファイル一覧ウィンドウの縦幅です。
 * @default 480
 * 
 * @param FileListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc セーブファイル一覧ウィンドウの透明度です。
 * @default 0
 * 
 * @param FileHeader
 * @desc セーブファイルの接頭語です。
 * @default File 
 * 
 * @param FileListBackground
 * @desc 各セーブファイルの背景です。
 * @type select
 * @option 塗りつぶし
 * @value filled
 * @option スキン
 * @value skin
 * @option テクスチャ（要TA_TextureBackground）
 * @default filled
 * @value texture
 *
 * @param FileIndexColor
 * @desc 塗りつぶし領域の色をRGBAで設定します。
 * @default 0, 0, 0, 0.4
 * @parent FileListBackground
 * 
 * @param FileIndexSkin
 * @desc スキンファイルを設定します。
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
 * 
 * @param NoDataText
 * @desc セーブファイルがない時に表示するテキストです。
 * @default NO DATA
 * 
 */
(() => {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  const filebg = String(parameters["SceneFileBackground"] || "");
  const filefg = String(parameters["SceneFileForeground"] || "");

  const filelistx = Number(parameters["FileListWindowX"] || 96);
  const filelisty = Number(parameters["FileListWindowY"] || 96);
  const filelistwidth = Number(parameters["FileListWindowWidth"] || 520);
  const filelistheight = Number(parameters["FileListWindowHeight"] || 420);
  const filelistop = Number(parameters["FileListWindowOp"] || 0);

  const fileheader = String(parameters["FileHeader"]);

  const filelistbg = String(parameters["FileListBackground"] || "filled");
  const fileindexcolor = String(parameters["FileIndexColor"] || "0, 0, 0, 0.4");
  const fileindexskin = String(parameters["FileIndexSkin"]);

  const fileIndexs = Number(parameters["FileIndexs"] || 8);

  const nodatatext = String(parameters["NoDataText"]);

  //DataManager
  var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    var info = _DataManager_makeSavefileInfo.call(this);
    info.name = $gameParty.nameForSavefile();
    info.level = $gameParty.levelForSavefile();
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
    var id = index;
    var valid = DataManager.isThisGameFile(id);
    var rect = this.itemRect(index);
    this.drawContextBackground(index, 1, 1)
    this.resetTextColor();
    if (this._mode === "load") {
      this.changePaintOpacity(valid);
    }
    this.drawFileId(id, rect.x + 4, rect.y + 4);
    this.drawFileData(id, rect.x + 180, rect.y + 4);
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

  Window_SavefileList.prototype.drawFileData = function (id, x, y) {
    const rect = this.contents.rect;
    if (info) {
        const face = info.faces[0];
        const leadername = info.name[0];
        this.drawFace(face[0], face[1], x, y + i * 48, 144, 32);
      this.drawText(leadername, x + 150, y, 120);
      this.drawText(info.playtime, x + 240, y, 360);
    } else {
      this.drawText(
        nodatatext, x, y, rect.width);
    }
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
  };

  var _Scene_File_start = Scene_File.prototype.start;
  Scene_File.prototype.start = function () {
    _Scene_File_start.call(this);
    this._listWindow.ensureCursorVisible();
    this._listWindow.callUpdateHelp();
  };
})();
