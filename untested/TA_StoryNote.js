//=============================================================================
// TA_StoryNote.js
//=============================================================================
/*:
 * @plugindesc ストーリーノート機能を実装します。
 * @author Tamaki Awana
 * @help ストーリーの展開を振り返ることが出来る、ストーリーノート機能を
 * 実装します。
 * あらかじめ設定しておいた変数の値と連動して、ストーリーの
 * 内容が表示されていきます。
 * 
 * 【プラグインコマンド】
 * StoryNote Open
 * ストーリーノートを開きます。
 * 
 * 【更新履歴】
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
 * @default 0
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート見出しウィンドウのY座標です。
 * @default 0
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの横幅です。
 * @default 816
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの縦幅です。
 * @default 72
 * @parent StoryNoteHeaderWindow
 * 
 * @param StoryHeaderText
 * @desc ストーリーノートの見出しです。
 * @default 次の目的
 *
 * @param StoryNoteListWindow
 * @desc ストーリーノート一覧ウィンドウについての設定です。
 * 
 * @param StoryNoteListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのX座標です。
 * @default 0
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのY座標です。
 * @default 72
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの横幅です。
 * @default 192
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの縦幅です。
 * @default 552
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
 * @default 192
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノートウィンドウのY座標です。
 * @default 72
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの横幅です。
 * @default 624
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの縦幅です。
 * @default 552
 * @parent StoryNoteWindow
 * 
 * @param StoryNotes
 * @desc ストーリーノートのエピソード一覧です。
 * @type struct<EpisodeList>[]
 * @default 
 * 
 */
/*~struct~EpisodeList:
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
/*:ja
 * @plugindesc ストーリーノート機能を実装します。
 * @author 沫那環
 * @help ストーリーの展開を振り返ることが出来る、ストーリーノート機能を
 * 実装します。
 * あらかじめ設定しておいた変数の値と連動して、ストーリーの
 * 内容が表示されていきます。
 * 
 * 【プラグインコマンド】
 * StoryNote Open
 * ストーリーノートを開きます。
 * 
 * 【更新履歴】
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
 * @default 0
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート見出しウィンドウのY座標です。
 * @default 0
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの横幅です。
 * @default 816
 * @parent StoryNoteHeaderWindow
 *
 * @param StoryNoteHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート見出しウィンドウの縦幅です。
 * @default 72
 * @parent StoryNoteHeaderWindow
 * 
 * @param StoryHeaderText
 * @desc ストーリーノートの見出しです。
 * @default 次の目的
 *
 * @param StoryNoteListWindow
 * @desc ストーリーノート一覧ウィンドウについての設定です。
 * 
 * @param StoryNoteListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのX座標です。
 * @default 0
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウのY座標です。
 * @default 72
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの横幅です。
 * @default 192
 * @parent StoryNoteListWindow
 *
 * @param StoryNoteListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノート一覧ウィンドウの縦幅です。
 * @default 552
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
 * @default 192
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ストーリーノートウィンドウのY座標です。
 * @default 72
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの横幅です。
 * @default 624
 * @parent StoryNoteWindow
 *
 * @param StoryNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ストーリーノートウィンドウの縦幅です。
 * @default 552
 * @parent StoryNoteWindow
 * 
 * @param StoryNotes
 * @desc ストーリーノートのエピソード一覧です。
 * @type struct<EpisodeList>[]
 * @default 
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
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

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

  var epbase = parameters["Episodes"];
  var episode = StructConvert(epbase);

  var stnbg = String(parameters["StoryNoteBackground"] || "");
  var stnmc = String(parameters["StoryNoteMenuCommandName"]);
  var stv = Number(parameters["StoryVariable"] || 0);

  var sthwx = Number(parameters["StoryNoteHeaderWindowX"] || 0);
  var sthwy = Number(parameters["StoryNoteHeaderWindowY"] || 0);
  var sthwwidth = Number(parameters["StoryNoteHeaderWindowWidth"] || 816);
  var sthwheight = Number(parameters["StoryNoteHeaderWindowHeight"] || 72);
  var sth = parameters["StoryHeaderText"];

  var stlistwx = Number(parameters["StoryNoteListWindowX"] || 0);
  var stlistwy = Number(parameters["StoryNoteListWindowY"] || 72);
  var stlistwwidth = Number(parameters["StoryNoteListWindowWidth"] || 192);
  var stlistwheight = Number(parameters["StoryNoteListWindowHeight"] || 552);

  var stnwx = Number(parameters["StoryNoteWindowX"] || 192);
  var stnwy = Number(parameters["StoryNoteWindowY"] || 72);
  var stnwwidth = Number(parameters["StoryNoteWindowWidth"] || 642);
  var stnwheight = Number(parameters["StoryNoteWindowHeight"] || 552);

 //Plugin Commands
 var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
 Game_Interpreter.prototype.pluginCommand = function(command, args) {
   _Game_Interpreter_pluginCommand.call(this, command, args);
   if (command === 'StoryNote') {
     switch (args[0]) {
       case 'Open':
       SceneManager.push(Scene_StoryNote);
       break;
     }
   }
 };

  //Game_System
  Game_System.prototype.EpisodeData = function (epid) {
    return episode[epid];
  };

  Game_System.prototype.EpisodeTitle = function (epid) {
    var title = this.EpisodeData(epid).EpisodeTitle;
    return title;
  };

  Game_System.prototype.IsEpisodeStarted = function (epid) {
    var stvv = $gameVariables.value(stv);
    var epprog = this.EpisodeData(epid).EpisodeProgress;
    var result = epprog.filter(function ({ EpisodeProgressValue }) {
      return EpisodeProgressValue <= stvv;
    });
    return result.length > 0;
  };

  Game_System.prototype.EpisodeNote = function (epid) {
    var note = null;
    var stvv = $gameVariables.value(stv);
    var epprog = this.EpisodeData(epid).EpisodeProgress;
    var result = epprog.filter(function ({ EpisodeProgressValue }) {
      return EpisodeProgressValue <= stvv;
    });
    note = result[result.length - 1].EpisodeProgressNote;
    return note;
  };

  //Window_MenuCommand
  var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
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
    var x = sthwx;
    var y = sthwy;
    var width = sthwwidth;
    var height = sthwheight;
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
    var x = stlistwx;
    var y = stlistwy;
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
    for (var i = 0; i < episode.length; i++) {
      var started = $gameSystem.IsEpisodeStarted(i);
      if (started){
        var ept = $gameSystem.EpisodeTitle(i);
        var epd = $gameSystem.EpisodeData(i);
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
    var x = stnwx;
    var y = stnwy;
    var width = stnwwidth;
    var height = stnwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._epindex = 0;
    this.refresh();
  };

  Window_StoryNote.prototype.drawMSTexts = function () {
    this.contents.clear();
    if (this._epindex != null) {
      var stnote = $gameSystem.EpisodeNote(this._epindex);
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
      this._backgroundSprite.bitmap = ImageManager.loadSystem(stnfg);
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
