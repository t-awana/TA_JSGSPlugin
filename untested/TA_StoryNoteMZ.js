//=============================================================================
// TA_StoryNoteMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Add the function of story note.
 * @author Tamaki Awana
 * @help Add the story note function that can review the 
 * progression of the story.
 * The story content is displayed based on 
 * the values ​​of pre-set variables.
 * 
 * Plugin Commands:  
 * OpenStoryNote
 * Open the story note scene.
 * 
 * Update History:
 * ver.1.0.1 English Supported
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * @param StoryNoteBackground
 * @desc Background on story note scene. Select "None" to disable it.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param StoryNoteMenuCommandName
 * @desc The command name of the story note to be displayed in the menu.
 * @default Story
 * 
 * @param StoryVariable
 * @desc Set the variable used to determine the progress.
 * @type variable
 * @default 0
 *
 * @param StoryNoteHeaderWindow
 * @desc Story note header window setting.
 * 
 * @param StoryNoteHeaderWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of story note header window.
 * @default -8
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of story note header window.
 * @default -8
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of story note header window.
 * @default 824
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of story note header window.
 * @default 80
 * @parent StoryNoteHeaderWindow
 * 
 * @param StoryHeaderText
 * @desc Header of story note.
 * @default Next purpose
 *
 * @param StoryNoteListWindow
 * @desc Story note list window setting.
 * 
 * @param StoryNoteListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of story note list window.
 * @default -8
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of story note list window.
 * @default 64
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of story note list window.
 * @default 200
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of story note list window.
 * @default 560
 * @parent StoryNoteListWindow
 * 
 * @param StoryNoteWindow
 * @desc Story note window setting.
 * 
 * @param StoryNoteWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of story note window.
 * @default 184
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of story note window.
 * @default 64
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of story note window.
 * @default 632
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of story note window.
 * @default 530
 * @parent StoryNoteWindow
 * 
 * @param StoryNotes
 * @desc List of story note episodes.
 * @type struct<EpisodeList>[]
 * @default 
 * 
 * @command StoryNoteOpen
 * @text OpenStoryNote
 * @desc Open the story note scene.
 * 
 */
/*~struct~EpisodeList:
 * @param id
 * @desc Value of episode.
 * @type number
 * @min 0
 * @max 99999999
 * @default 0
 * 
 * @param EpisodeTitle
 * @desc Title of episode.
 * @default
 * 
 * @param EpisodeNote
 * @desc Details of episode.
 * @type note
 * @default
 */
/*:ja
 * @target MZ
 * @plugindesc ストーリーノート機能を実装します。
 * @author 沫那環
 * @help ストーリーの展開を振り返ることが出来る、ストーリーノート機能を
 * 実装します。
 * あらかじめ設定しておいた変数の値と連動して、ストーリーの
 * 内容が表示されていきます。
 * 
 * 【プラグインコマンド】
 * ストーリーノートを開く
 * ストーリーノートを開きます。
 * 
 * 【更新履歴】
 * 　ver.1.0.1 英語に対応
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param StoryNoteBackground
 * @desc ストーリーノートシーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param StoryNoteMenuCommandName
 * @desc メニューに表示するコマンド名です。
 * @default ストーリー
 * 
 * @param StoryVariable
 * @desc 進行度の判定に使う変数を設定します。
 * @type variable
 * @default 0
 *
 * @param StoryNoteHeaderWindow
 * @desc ストーリーノート見出しウィンドウについての設定です。
 * 
 * @param StoryNoteHeaderWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート見出しウィンドウのX座標です。
 * @default -8
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート見出しウィンドウのY座標です。
 * @default -8
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの横幅です。
 * @default 824
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの縦幅です。
 * @default 80
 * @parent StoryNoteHeaderWindow
 * 
 * @param StoryHeaderText
 * @desc ストーリーノートの見出しです。
 * @default ストーリーノート
 *
 * @param StoryNoteListWindow
 * @desc ストーリーノート一覧ウィンドウについての設定です。
 * 
 * @param StoryNoteListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのX座標です。
 * @default -8
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのY座標です。
 * @default 64
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの横幅です。
 * @default 200
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの縦幅です。
 * @default 560
 * @parent StoryNoteListWindow
 * 
 * @param StoryNoteWindow
 * @desc ストーリーノートウィンドウについての設定です。
 * 
 * @param StoryNoteWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノートウィンドウのX座標です。
 * @default 184
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノートウィンドウのY座標です。
 * @default 64
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの横幅です。
 * @default 632
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの縦幅です。
 * @default 560
 * @parent StoryNoteWindow
 * 
 * @param StoryNotes
 * @desc ストーリーノートのエピソード一覧です。
 * @type struct<EpisodeList>[]
 * @default 
 * 
 * @command StoryNoteOpen
 * @text ストーリーノートを開く
 * @desc ストーリーノートを開きます。
 * 
 */
/*~struct~EpisodeList:ja
 * @param id
 * @desc エピソードの値です。
 * @type number
 * @min 0
 * @max 99999999
 * @default 0
 * 
 * @param EpisodeTitle
 * @desc エピソードのタイトルです。
 * @default
 * 
 * @param EpisodeNote
 * @desc エピソードの詳細です。
 * @type note
 * @default
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

  const epbase = parameters["Episodes"];
  const episode = StructConvert(epbase);

  const stnbg = String(parameters["StoryNoteBackground"] || "");
  const stnmc = String(parameters["StoryNoteMenuCommandName"]);
  const stv = Number(parameters["StoryVariable"] || 0);

  const sthwx = Number(parameters["StoryNoteHeaderWindowX"] || -8);
  const sthwy = Number(parameters["StoryNoteHeaderWindowY"] || -8);
  const sthwwidth = Number(parameters["StoryNoteHeaderWindowWidth"] || 824);
  const sthwheight = Number(parameters["StoryNoteHeaderWindowHeight"] || 80);
  const sth = parameters["StoryHeaderText"];

  const stlistwx = Number(parameters["StoryNoteListWindowX"] || -8);
  const stlistwy = Number(parameters["StoryNoteListWindowY"] || 64);
  const stlistwwidth = Number(parameters["StoryNoteListWindowWidth"] || 200);
  const stlistwheight = Number(parameters["StoryNoteListWindowHeight"] || 560);

  const stnwx = Number(parameters["StoryNoteWindowX"] || 184);
  const stnwy = Number(parameters["StoryNoteWindowY"] || 64);
  const stnwwidth = Number(parameters["StoryNoteWindowWidth"] || 650);
  const stnwheight = Number(parameters["StoryNoteWindowHeight"] || 560);

 //Plugin Commands
  PluginManager.registerCommand(pluginName, "StoryNoteOpen", args => {
    SceneManager.push(Scene_StoryNote);
  });

  //Game_System
  Game_System.prototype.EpisodeData = function (epid) {
    return episode[epid];
  };

  Game_System.prototype.EpisodeTitle = function (epid) {
    var title = this.EpisodeData(epid).EpisodeTitle;
    return title;
  };

  Game_System.prototype.IsEpisodeStarted = function (epid) {
    const stvv = $gameVariables.value(stv);
    const epprog = this.EpisodeData(epid).EpisodeProgress;
    const result = epprog.filter(function ({ EpisodeProgressValue }) {
      return EpisodeProgressValue <= stvv;
    });
    return result.length > 0;
  };

  Game_System.prototype.EpisodeNote = function (epid) {
    let note = null;
    const stvv = $gameVariables.value(stv);
    const epprog = this.EpisodeData(epid).EpisodeProgress;
    const result = epprog.filter(function ({ EpisodeProgressValue }) {
      return EpisodeProgressValue <= stvv;
    });
    note = result[result.length - 1].EpisodeProgressNote;
    return note;
  };

  //Window_MenuCommand
  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addStoryNoteCommand();
  };

  Window_MenuCommand.prototype.addStoryNoteCommand = function () {
    this.addCommand(stnmc, "storynote", true);
  };

  //Window_SNHeader
  function Window_SNHeader() {
    this.initialize.apply(this, arguments);
  }

  Window_SNHeader.prototype = Object.create(Window_Base.prototype);
  Window_SNHeader.prototype.constructor = Window_SNHeader;

  Window_SNHeader.prototype.initialize = function() {
    const x = sthwx;
    const y = sthwy;
    const width = sthwwidth;
    const height = sthwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.drawText(sth, 0, 0, this.contentsWidth());
  };

  //Window_StoryList
  function Window_StoryList() {
    this.initialize.apply(this, arguments);
  }

  Window_StoryList.prototype = Object.create(Window_Command.prototype);
  Window_StoryList.prototype.constructor = Window_StoryList;

  Window_StoryList.prototype.initialize = function () {
    const x = stlistwx;
    const y = stlistwy;
    Window_Command.prototype.initialize.call(this, x, y);
    this.refresh();
    this.activate();
  };

  Window_StoryList.prototype.windowWidth = function() {
    return stlistwwidth;
  };

  Window_StoryList.prototype.windowHeight = function() {
    return stlistwheight;
  };

  Window_StoryList.prototype.isOkEnabled = function () {
    return false;
  };

  Window_StoryList.prototype.numVisibleRows = function() {
    return this.maxItems();
  };

  Window_StoryList.prototype.makeCommandList = function() {
    for (let i = 0; i < episode.length; i++) {
      const started = $gameSystem.IsEpisodeStarted(i);
      if (started){
        const ept = $gameSystem.EpisodeTitle(i);
        const epd = $gameSystem.EpisodeData(i);
        this.addCommand(ept, 'episode', true, epd.id);
      };
    };
  };

  Window_StoryList.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (this._storynoteWindow) {
      this._storynoteWindow.setIndex(this.currentExt());
    }
  };

  Window_StoryList.prototype.setStotyWindow = function (storyWindow) {
    this._storynoteWindow = storyWindow;
  };

  //Window_StoryNote
  function Window_StoryNote() {
    this.initialize.apply(this, arguments);
  }

  Window_StoryNote.prototype = Object.create(Window_Base.prototype);
  Window_StoryNote.prototype.constructor = Window_StoryNote;

  Window_StoryNote.prototype.initialize = function () {
    const x = stnwx;
    const y = stnwy;
    const width = stnwwidth;
    const height = stnwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._epindex = 0;
    this.refresh();
  };

  Window_StoryNote.prototype.drawMSTexts = function () {
    this.contents.clear();
    if (this._epindex != null) {
      const stnote = $gameSystem.EpisodeNote(this._epindex);
      this.drawTextEx(stnote, 0, 0);
    }
  };

  Window_StoryNote.prototype.setIndex = function (index) {
    if (this._epindex !== index && this._epindex != null) {
      this._epindex = index;
      this.refresh();
    }
  };

  Window_StoryNote.prototype.refresh = function() {
    this.drawMSTexts();
  };

  //Scene_StoryNote
  function Scene_StoryNote() {
    this.initialize.apply(this, arguments);
  }

  Scene_StoryNote.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_StoryNote.prototype.constructor = Scene_StoryNote;

  Scene_StoryNote.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_StoryNote.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHeaderWindow();
    this.createStoryNoteWindow();
    this.createStoryListWindow();
    this._listWindow.activate();
    this._listWindow.select(0);
  };

  Scene_StoryNote.prototype.createHeaderWindow = function() {
    this._headerWindow = new Window_SNHeader();
    this.addWindow(this._headerWindow);
  };

  Scene_StoryNote.prototype.createStoryNoteWindow = function () {
    this._storynoteWindow = new Window_StoryNote();
    this.addWindow(this._storynoteWindow);
  };

  Scene_StoryNote.prototype.createStoryListWindow = function () {
    this._listWindow = new Window_StoryList();
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._listWindow);
    this._listWindow.setStotyWindow(this._storynoteWindow);
    this._storynoteWindow._storyindex = this._listWindow.index();
  };

  var _Scene_StoryNote_createBackground = Scene_StoryNote.prototype.createBackground;
  Scene_StoryNote.prototype.createBackground = function () {
      _Scene_StoryNote_createBackground.call(this);
    if (stnbg) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(stnbg);
      this.addChild(this._backgroundSprite);
    }
  };

  //Scene_Menu
  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("storynote", this.commandStoryNote.bind(this));
  };

  Scene_Menu.prototype.commandStoryNote = function () {
    SceneManager.push(Scene_StoryNote);
  };

})();
