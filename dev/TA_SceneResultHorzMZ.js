//=============================================================================
// TA_SceneResultHorz.MZjs
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 汎用リザルトシーンを追加します。
 * @author Tamaki Awana
 * @help 戦闘終了後だけではなく、マップ上でも呼び出せる汎用リザルト
 * シーンを追加します。
 * 
 * 【プラグインコマンド】
 * リザルトシーンの金額設定 獲得金額
 * 獲得金額の数値を設定します。
 * 
 * リザルトシーンの経験値設定 獲得経験値
 * 獲得経験値の値を設定します。
 * 
 * リザルトシーンのAP設定 獲得AP
 * TA_AbilityPointMZ導入時に獲得できるAPの値を設定します。
 * 
 * リザルトシーンの事前コモンイベント設定 コモンイベントのID
 * 戦績ウィンドウを開く前に実行するコモンイベントのIDを指定します。
 * 「なし」を指定すると、そのまま戦績ウィンドウを開きます。
 * 
 * リザルトシーンを開く
 * リザルトシーンを開きます。
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ResultBackground
 * @desc 戦績シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param PreCommonEvent
 * @desc 標準で、戦績ウィンドウを表示する前に実行するコモンイベントです。「なし」で無効になります。
 * @type common_event
 * @default 0
 * 
 * @param VictoryBGM
 * @desc 戦闘勝利時に再生するBGMです。「なし」で標準のジングルのみを再生します。
 * @type file
 * @dir audio/bgm
 * @require 1
 * @default 
 * 
 * @param VictoryBGMVolume
 * @desc 戦闘勝利時に再生するBGMの音量です。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @parent VictoryBGM
 * 
 * @param VictoryBGMPitch
 * @desc 戦闘勝利時に再生するBGMのピッチです。
 * @type number
 * @min -50
 * @max 50
 * @default 0
 * @parent VictoryBGM
 * 
 * @param VictoryBGMPan
 * @desc 戦闘勝利時に再生するBGMの位相です。
 * @type number
 * @min -50
 * @max 50
 * @default 0
 * @parent VictoryBGM
 * 
 * @param BattleResultHeaderWindow
 * @desc 戦績見出しウィンドウについての設定です。
 * 
 * @param BRHWX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 戦績見出しウィンドウのX座標です。
 * @default 0
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 戦績見出しウィンドウのY座標です。
 * @default 0
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 戦績見出しウィンドウの横幅です。
 * @default 816
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 戦績見出しウィンドウの縦幅です。
 * @default 72
 * @parent BattleResultHeaderWindow
 * 
 * @param BRHeader
 * @desc 戦績の見出しです。
 * @default Battle Result
 * @parent BattleResultHeaderWindow
 * 
 * @param CharacterResultWindow
 * @desc キャラクター戦績ウィンドウの設定です。
 * 
 * @param CharacterResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc キャラクター戦績ウィンドウのX座標です。
 * @default 0
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc キャラクター戦績ウィンドウのY座標です。
 * @default 72
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクター戦績ウィンドウの横幅です。
 * @default 408
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクター戦績ウィンドウの縦幅です。
 * @default 552
 * @parent CharacterResultWindow
 * 
 * @param LearnNewSkillText
 * @desc 新規にスキルを習得する際に表示されるテキストです。
 * @default New Skill!
 * @parent CharacterResultWindow
 * 
 * @param ItemResultWindow
 * @desc アイテム獲得ウィンドウの設定です。
 * 
 * @param ItemResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテム獲得ウィンドウのX座標です。
 * @default 408
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテム獲得ウィンドウのY座標です。
 * @default 72
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテム獲得ウィンドウの横幅です。
 * @default 408
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテム獲得ウィンドウの縦幅です。
 * @default 480
 * @parent ItemResultWindow
 * 
 * @param GoldResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 獲得金額ウィンドウのX座標です。
 * @default 576
 * @parent GoldResultWindow
 *
 * @param GoldResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 獲得金額ウィンドウのY座標です。
 * @default 552
 * @parent GoldResultWindow
 * 
 * @command ResultHorzSetGold
 * @text リザルトシーンの金額設定
 * @desc 獲得金額の数値を設定します。
 *
 * @arg SetGold
 * @type number
 * @default 0
 * @text 獲得金額
 * @desc 設定する金額です。
 * 
 * @command ResultHorzSetExp
 * @text リザルトシーンの経験値設定
 * @desc 獲得経験値の値を設定します。
 * 
 * @arg SetExp
 * @type number
 * @default 0
 * @text 獲得経験値
 * @desc 設定する経験値です。
 * 
 * @command ResultHorzSetAP
 * @text リザルトシーンのAP設定
 * @desc TA_AbilityPointMZ導入時に獲得できるAPの値を設定します。
 *
 * @arg SetAP
 * @type number
 * @default 0
 * @text 獲得AP
 * @desc 設定するAPの値です。
 * 
 * @command ResultHorzSetPreCommonEvent
 * @text リザルトシーンの事前コモンイベント設定
 * @desc 事前に実行するコモンイベントを指定します。
 * 
 * @arg SetPreCommon
 * @type number
 * @default 0
 * @text コモンイベントのID
 * @desc 実行させたいコモンイベントのIDです。
 * 
 * @command SceneResultHorzOpen
 * @text リザルトシーンを開く
 * @desc リザルトシーンを開きます。
 * 
*/
/*:ja
 * @target MZ
 * @plugindesc 汎用リザルトシーンを追加します。
 * @author 沫那環
 * @help 戦闘終了後だけではなく、マップ上でも呼び出せる汎用リザルト
 * シーンを追加します。
 * 
 * 【プラグインコマンド】
 * リザルトシーンの金額設定 獲得金額
 * 獲得金額の数値を設定します。
 * 
 * リザルトシーンの経験値設定 獲得経験値
 * 獲得経験値の値を設定します。
 * 
 * リザルトシーンのAP設定 獲得AP
 * TA_AbilityPointMZ導入時に獲得できるAPの値を設定します。
 * 
 * リザルトシーンの事前コモンイベント設定 コモンイベントのID
 * 戦績ウィンドウを開く前に実行するコモンイベントのIDを指定します。
 * 「なし」を指定すると、そのまま戦績ウィンドウを開きます。
 * 
 * リザルトシーンを開く
 * リザルトシーンを開きます。
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ResultBackground
 * @desc 戦績シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param PreCommonEvent
 * @desc 標準で、戦績ウィンドウを表示する前に実行するコモンイベントです。「なし」で無効になります。
 * @type common_event
 * @default 0
 * 
 * @param VictoryBGM
 * @desc 戦闘勝利時に再生するBGMです。「なし」で標準のジングルのみを再生します。
 * @type file
 * @dir audio/bgm
 * @require 1
 * @default 
 * 
 * @param VictoryBGMVolume
 * @desc 戦闘勝利時に再生するBGMの音量です。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @parent VictoryBGM
 * 
 * @param VictoryBGMPitch
 * @desc 戦闘勝利時に再生するBGMのピッチです。
 * @type number
 * @min -50
 * @max 50
 * @default 0
 * @parent VictoryBGM
 * 
 * @param VictoryBGMPan
 * @desc 戦闘勝利時に再生するBGMの位相です。
 * @type number
 * @min -50
 * @max 50
 * @default 0
 * @parent VictoryBGM
 * 
 * @param BattleResultHeaderWindow
 * @desc 戦績見出しウィンドウについての設定です。
 * 
 * @param BRHWX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 戦績見出しウィンドウのX座標です。
 * @default 0
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 戦績見出しウィンドウのY座標です。
 * @default 0
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 戦績見出しウィンドウの横幅です。
 * @default 816
 * @parent BattleResultHeaderWindow
 *
 * @param BRHWHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 戦績見出しウィンドウの縦幅です。
 * @default 72
 * @parent BattleResultHeaderWindow
 * 
 * @param BRHeader
 * @desc 戦績の見出しです。
 * @default Battle Result
 * @parent BattleResultHeaderWindow
 * 
 * @param CharacterResultWindow
 * @desc キャラクター戦績ウィンドウの設定です。
 * 
 * @param CharacterResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc キャラクター戦績ウィンドウのX座標です。
 * @default 0
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc キャラクター戦績ウィンドウのY座標です。
 * @default 72
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクター戦績ウィンドウの横幅です。
 * @default 408
 * @parent CharacterResultWindow
 * 
 * @param CharacterResultWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクター戦績ウィンドウの縦幅です。
 * @default 552
 * @parent CharacterResultWindow
 * 
 * @param LearnNewSkillText
 * @desc 新規にスキルを習得する際に表示されるテキストです。
 * @default New Skill!
 * @parent CharacterResultWindow
 * 
 * @param ItemResultWindow
 * @desc アイテム獲得ウィンドウの設定です。
 * 
 * @param ItemResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテム獲得ウィンドウのX座標です。
 * @default 408
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテム獲得ウィンドウのY座標です。
 * @default 72
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテム獲得ウィンドウの横幅です。
 * @default 408
 * @parent ItemResultWindow
 * 
 * @param ItemResultWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテム獲得ウィンドウの縦幅です。
 * @default 480
 * @parent ItemResultWindow
 * 
 * @param GoldResultWindow
 * @desc 獲得金額ウィンドウの設定です。
 * 
 * @param GoldResultWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 獲得金額ウィンドウのX座標です。
 * @default 576
 * @parent GoldResultWindow
 *
 * @param GoldResultWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 獲得金額ウィンドウのY座標です。
 * @default 552
 * @parent GoldResultWindow
 * 
 * @command ResultHorzSetGold
 * @text リザルトシーンの金額設定
 * @desc 獲得金額の数値を設定します。
 *
 * @arg SetGold
 * @type number
 * @default 0
 * @text 獲得金額
 * @desc 設定する金額です。
 * 
 * @command ResultHorzSetExp
 * @text リザルトシーンの経験値設定
 * @desc 獲得経験値の値を設定します。
 * 
 * @arg SetExp
 * @type number
 * @default 0
 * @text 獲得経験値
 * @desc 設定する経験値です。
 * 
 * @command ResultHorzSetAP
 * @text リザルトシーンのAP設定
 * @desc TA_AbilityPointMZ導入時に獲得できるAPの値を設定します。
 *
 * @arg SetAP
 * @type number
 * @default 0
 * @text 獲得AP
 * @desc 設定するAPの値です。
 * 
 * @command ResultHorzSetPreCommonEvent
 * @text リザルトシーンの事前コモンイベント設定
 * @desc 事前に実行するコモンイベントを指定します。
 * 
 * @arg SetPreCommon
 * @type number
 * @default 0
 * @text コモンイベントのID
 * @desc 実行させたいコモンイベントのIDです。
 * 
 * @command SceneResultHorzOpen
 * @text リザルトシーンを開く
 * @desc リザルトシーンを開きます。
 * 
*/
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const rstbg = String(parameters["ResultBackground"] || "");

  const precev = Number(parameters["PreCommonEvent"] || 0);

  const victorybgm = String(parameters["VictoryBGM"] || "");
  const victorybgmvol = Number(parameters["VictoryBGMVolume"] || 90);
  const victorybgmpitch = Number(parameters["VictoryBGMPitch"] || 0);
  const victorybgmpan = Number(parameters["VictoryBGMPan"] || 0);

  const brhwx = Number(parameters["BRHWX"] || 0);
  const brhwy = Number(parameters["BRHWY"] || 0);
  const brhwwidth = Number(parameters["BRHWWidth"] || 816);
  const brhwheight = Number(parameters["BRHWHeight"] || 72);
  const brheader = String(parameters["BRHeader"]);

  const crwx = Number(parameters["CharacterResultWindowX"] || 0);
  const crwy = Number(parameters["CharacterResultWindowY"] || 72);
  const crwwidth = Number(parameters["CharacterResultWindowWidth"] || 408);
  const crwheight = Number(parameters["CharacterResultWindowHeight"] || 552);
  const lnst = String(parameters["LearnNewSkillText"]);

  const imwx = Number(parameters["ItemResultWindowX"] || 408);
  const imwy = Number(parameters["ItemResultWindowY"] || 72);
  const imwwidth = Number(parameters["ItemResultWindowWidth"] || 408);
  const imwheight = Number(parameters["ItemResultWindowHeight"] || 480);

  const grwx = Number(parameters["GoldResultWindowX"] || 576);
  const grwy = Number(parameters["GoldResultWindowY"] || 552);

  //TA_AbilityPointMZ compatible

  const param_tap = PluginManager.parameters("TA_AbilityPointMZ");

  const tapison = Object.keys(param_tap).length > 0;

 //Plugin Commands
  PluginManager.registerCommand(pluginName, "ResultHorzSetGold", args) => {
    const gold = Number(args.SetGold);
    $gameSystem.Result_SetGold(gold);
  });

  PluginManager.registerCommand(pluginName, "ResultHorzSetExp", args) => {
    const exp = Number(args.SetExp);
    $gameSystem.Result_SetExp(exp);
  });

  PluginManager.registerCommand(pluginName, "ResultHorzSetAP", args) => {
    const ap = Number(args.SetAP);
    $gameSystem.Result_SetAP(ap);
  });

  PluginManager.registerCommand(pluginName, "ResultHorzSetPreCommonEvent", args) => {
    const precommonev = Number(args.SetPreCommon);
    $gameSystem.Result_SetPreCommon(precommonev);
  });

  PluginManager.registerCommand(pluginName, "SceneResultHorzOpen", args) => {
     SceneManager.push(Scene_ResultHorz);
  });

  //Game_System

  //Window_ResultHeader
  function Window_ResultHeader() {
    this.initialize.apply(this, arguments);
  }

  Window_ResultHeader.prototype = Object.create(Window_Base.prototype);
  Window_ResultHeader.prototype.constructor = Window_ResultHeader;

  Window_ResultHeader.prototype.initialize = function() {
    const x = brhwx;
    const y = brhwx;
    const width = brhwwidth;
    const height = brhwheight;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.drawText(brheader, 0, 0, this.contentsWidth());
  };

  //Window_ActorResult
  function Window_ActorResult() {
    this.initialize.apply(this, arguments);
  }

  Window_ActorResult.prototype = Object.create(Window_Base.prototype);
  Window_ActorResult.prototype.constructor = Window_ActorResult;

  //Window_ItemResult
  function Window_ItemResult() {
    this.initialize.apply(this, arguments);
  }

  Window_ItemResult.prototype = Object.create(Window_Base.prototype);
  Window_ItemResult.prototype.constructor = Window_ItemResult;

  //Window_GoldResult
  function Window_GoldResult() {
    this.initialize.apply(this, arguments);
  }

  Window_GoldResult.prototype = Object.create(Window_Base.prototype);
  Window_GoldResult.prototype.constructor = Window_GoldResult;

  //Scene_ResultHorz
  function Scene_ResultVert() {
    this.initialize.apply(this, arguments);
  }

  Scene_ResultHorz.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_ResultHortz.prototype.constructor = Scene_ResultHorz;

  Scene_ResultHorz.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_ResultHorz.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHeaderWindow();
    this.createActorResultWindow();
    this.createItemResultWindow();
    this.createGoldResultWindow();
  };

  Scene_ResultHorz.prototype.createHeaderWindow = function() {
    this._headerWindow = new Window_ResultHeader();
    this.addWindow(this._headerWindow);
  };

  Scene_ResultHorz.prototype.createActorResultWindow = function() {

  };

  Scene_ResultHorz.prototype.createItemResultWindow = function() {

  };

  Scene_ResultHorz.prototype.createGoldResultWindow = function() {

  };

  const _Scene_ResultHorz_createBackground = Scene_ResultHorz.prototype.createBackground;
  Scene_ResultHorz.prototype.createBackground = function () {
      _Scene_ResultHorz_createBackground.call(this);
    if (rstbg) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(rstbg);
      this.addChild(this._backgroundSprite);
    }
  };
})();