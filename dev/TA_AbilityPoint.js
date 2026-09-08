//=============================================================================
// TA_AbilityPoint.js
//=============================================================================
/*:
 * @plugindesc アビリティポイントシステムを実装します。
 * @author Tamaki Awana
 * @help スキル習得に使えるアビリティポイントシステムを実装します。
 * 
 * 【メモタグでの機能追加】
 * <TA_AP_Need:必要AP>
 * スキル習得システムでスキルを習得する際に必要になるAPの値です。
 * 例：<TA_AP_Need:25>
 * 
 * <TA_AP_Gain:獲得AP>
 * エネミーを倒したり、アイテムを使用すると獲得できるAPを設定します。
 * 例：<TA_AP_Gain:250>
 * 
 * <TA_AP_Rate:AP獲得レート（単位：%）>
 * エネミーを撃破した際に獲得できるAPの値を変動させます。
 * 例：<TA_AP_Rate:120%>
 * 
 * <TA_AP_Skill:習得できるスキルのID>
 * スキル習得システムで習得できるスキルを設定します。
 * 例：<TA_AP_Skill:96,97>
 * 　　<TA_AP_Skill:25-28,45>
 * 
 * 【プラグインコマンド】
 * TA_AP Gain [獲得AP]  [アクターID]
 * 指定したアクターIDのアクターに、APを獲得させます。
 * 例：TA_AP Gain 100 1
 * 
 * TA_AP Lose [失効AP]  [アクターID]
 * 指定したアクターIDのアクターのAPを失効させます。
 * 例：TA_AP Lose 10 3
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param APHeader
 * @desc APの見出しです。
 * @default AP
 * 
 * @param APLetter
 * @desc APの単位です。
 * @default P
 * 
 * @param APDefaultGain
 * @desc タグ未設定時に獲得できるAPの値です。
 * @type number
 * @min 0
 * @max 999
 * @default 0
 * 
 * @param APLearnMenu
 * @desc スキル習得システムを利用するかどうかの設定です。
 * @type boolean
 * @on 利用する
 * @off 利用しない
 * @default true
 * 
 * @param APLearnMenuCommandName
 * @desc メニューに表示するコマンド名です。
 * @default スキル習得
 * @parent APLearnMenu
 * 
 * @param APDefaultLearn
 * @desc タグ未設定時に、スキル習得システムを利用してスキルを習得する際に必要になるAPの値です。
 * @type number
 * @min 0
 * @max 999
 * @default 10
 * @parent APLearnMenu
 * 
 * @param APLearnBackground
 * @desc スキル習得シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent APLearnMenu
 * 
 * @param APListWindow
 * @desc 習得スキル一覧ウィンドウについての設定です。
 * @parent APLearnMenu
 * 
 * @param APListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 習得スキル一覧ウィンドウのX座標です。
 * @default 0
 * @parent APListWindow
 *
 * @param APListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 習得スキル一覧ウィンドウのY座標です。
 * @default 180
 * @parent APListWindow
 *
 * @param APListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 習得スキル一覧ウィンドウの横幅です。
 * @default 408
 * @parent APListWindow
 *
 * @param APListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 習得スキル一覧ウィンドウの縦幅です。
 * @default 444
 * @parent APListWindow
 * 
 * @param APListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc 習得スキル一覧ウィンドウの透明度です。
 * @default 255
 * @parent APListWindow
 * 
 * @param APLearnDetailWindow
 * @desc スキル習得詳細ウィンドウについての設定です。
 * @parent APLearnMenu
 * 
 * @param APLearnDetailWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc スキル習得詳細ウィンドウのX座標です。
 * @default 408
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc スキル習得詳細ウィンドウのY座標です。
 * @default 180
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc スキル習得詳細ウィンドウの横幅です。
 * @default 408
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc スキル習得詳細ウィンドウの縦幅です。
 * @default 444
 * @parent APLearnDetailWindow
 * 
 * @param APLearnDetailWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc スキル習得詳細ウィンドウの透明度です。
 * @default 255
 * @parent APLearnDetailWindow
 * 
*/
/*:ja
 * @plugindesc アビリティポイントシステムを実装します。
 * @author 沫那環
 * @help スキル習得に使えるアビリティポイントシステムを実装します。
 * 
 * 【メモタグでの機能追加】
 * <TA_AP_Need:必要AP>
 * スキル習得システムでスキルを習得する際に必要になるAPの値です。
 * 例：<TA_AP_Need:25>
 * 
 * <TA_AP_Gain:獲得AP>
 * エネミーを倒したり、アイテムを使用すると獲得できるAPを設定します。
 * 例：<TA_AP_Gain:250>
 * 
 * <TA_AP_Rate:AP獲得レート（単位：%）>
 * エネミーを撃破した際に獲得できるAPの値を変動させます。
 * 例：<TA_AP_Rate:120%>
 * 
 * <TA_AP_Skill:習得できるスキルのID>
 * スキル習得システムで習得できるスキルを設定します。
 * 例：<TA_AP_Skill:96,97>
 * 　　<TA_AP_Skill:25-28,45>
 * 
 * 【プラグインコマンド】
 * TA_AP Gain [獲得AP]  [アクターID]
 * 指定したアクターIDのアクターに、APを獲得させます。
 * 例：TA_AP Gain 100 1
 * 
 * TA_AP Lose [失効AP]  [アクターID]
 * 指定したアクターIDのアクターのAPを失効させます。
 * 例：TA_AP Lose 10 3
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param APHeader
 * @desc APの見出しです。
 * @default AP
 * 
 * @param APLetter
 * @desc APの単位です。
 * @default P
 * 
 * @param APDefaultGain
 * @desc タグ未設定時に獲得できるAPの値です。
 * @type number
 * @min 0
 * @max 999
 * @default 0
 * 
 * @param APLearnMenu
 * @desc スキル習得システムを利用するかどうかの設定です。
 * @type boolean
 * @on 利用する
 * @off 利用しない
 * @default true
 * 
 * @param APLearnMenuCommandName
 * @desc メニューに表示するコマンド名です。
 * @default スキル習得
 * @parent APLearnMenu
 * 
 * @param APDefaultLearn
 * @desc タグ未設定時に、スキル習得システムを利用してスキルを習得する際に必要になるAPの値です。
 * @type number
 * @min 0
 * @max 999
 * @default 10
 * @parent APLearnMenu
 * 
 * @param APLearnBackground
 * @desc スキル習得シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent APLearnMenu
 * 
 * @param APListWindow
 * @desc 習得スキル一覧ウィンドウについての設定です。
 * @parent APLearnMenu
 * 
 * @param APListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 習得スキル一覧ウィンドウのX座標です。
 * @default 0
 * @parent APListWindow
 *
 * @param APListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 習得スキル一覧ウィンドウのY座標です。
 * @default 180
 * @parent APListWindow
 *
 * @param APListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 習得スキル一覧ウィンドウの横幅です。
 * @default 408
 * @parent APListWindow
 *
 * @param APListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 習得スキル一覧ウィンドウの縦幅です。
 * @default 444
 * @parent APListWindow
 * 
 * @param APListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc 習得スキル一覧ウィンドウの透明度です。
 * @default 255
 * @parent APListWindow
 * 
 * @param APLearnDetailWindow
 * @desc スキル習得詳細ウィンドウについての設定です。
 * @parent APLearnMenu
 * 
 * @param APLearnDetailWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc スキル習得詳細ウィンドウのX座標です。
 * @default 408
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc スキル習得詳細ウィンドウのY座標です。
 * @default 180
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc スキル習得詳細ウィンドウの横幅です。
 * @default 408
 * @parent APLearnDetailWindow
 *
 * @param APLearnDetailWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc スキル習得詳細ウィンドウの縦幅です。
 * @default 444
 * @parent APLearnDetailWindow
 * 
 * @param APLearnDetailWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc スキル習得詳細ウィンドウの透明度です。
 * @default 255
 * @parent APLearnDetailWindow
 * 
*/
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var apheader = String(parameters["APHeader"]);
  var apletter = String(parameters["APLetter"]);
  var  apdefgain= Number(parameters["APDefaultGain"] || 0);

  var aplearnmenu = String(parameters["APLearnMenu"] || "true");
  var aplmcname = String(parameters["APLearnMenuCommandName"]);
  var  apdeflearn= Number(parameters["APDefaultLearn"] || 10);

  var aplbg = String(parameters["APLearnBackground"] || "");

  var aplistx = Number(parameters["APListWindowX"] || 0);
  var aplisty = Number(parameters["APListWindowY"] || 180);
  var aplistwidth = Number(parameters["APListWindowWidth"] || 408);
  var aplistheight = Number(parameters["APListWindowHeight"] || 444);
  var aplistop = Number(parameters["APListWindowOp"] || 255);

  var apdx = Number(parameters["APLearnDetailWindowX"] || 408);
  var apdy = Number(parameters["APLearnDetailWindowY"] || 180);
  var apdwidth = Number(parameters["APLearnDetailWindowWidth"] || 408);
  var apdheight = Number(parameters["APLearnDetailWindowHeight"] || 444);
  var apdop = Number(parameters["APLearnDetailWindowOp"] || 255);

  //Game_Interpreter
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === "TA_AP ") {
        switch (args[0]) {
          case "Gain":
            var gainaprate = Number(args[1]);
            var actorid = Number(args[2]);
            $gameSystem.gainAP(gainaprate, actorid);
            break;
          case "Lose":
            var loseaprate = Number(args[1]);
            var actorid = Number(args[2]);
            $gameSystem.loseAP(loseaprate, actorid);
            break;
          case 'Open':
            SceneManager.push(Scene_SkillLearning);
            break;
        }
      }
    }
  };

  //Game_System

  //Window_MenuCommand
  var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addSkillLearningCommand();
  };

  Window_MenuCommand.prototype.addSkillLearningCommand = function () {
    this.addCommand(stnmc, "aplearning", true);
  };

  //Scene_SkillLearning
  function Scene_SkillLearning() {
    this.initialize.apply(this, arguments);
  }

  Scene_SkillLearning.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_SkillLearning.prototype.constructor = Scene_SkillLearning;

  Scene_SkillLearning.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_SkillLearning.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createActorAPWindow();
    this.createLearningSkillListWindow();
    this.createLearningSkillDetailWindow();
    this._learningListWindow.activate();
    this._LearningListWindow.select(0);
  };

  Scene_SkillLearning.prototype.createActorAPWindow = function () {
    this._actorAPWindow = new Window_ActorAPWindow();
    this.addWindow(this._actorAPWindow);
  };

  Scene_SkillLearning.prototype.createLearningSkillDetailWindow = function () {
    this._skillDetailWindow = new Window_LearningSkillDetail();
    this.addWindow(this._skillDetailWindow);
  };

  Scene_SkillLearning.prototype.createLearningSkillListWindow = function () {
    this._learningListWindow = new Window_LearningSkillList();
    this._learningListWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._learningListWindow);
    this._listWindow.setDetailWindow(this._skillDetailWindow);
    this._learningListWindow._learnindex = this._learningListWindow.index();
  };

  var _Scene_SkillLearning_createBackground = Scene_SkillLearning.prototype.createBackground;
  Scene_SkillLearning.prototype.createBackground = function () {
      _Scene_SkillLearning_createBackground.call(this);
    if (aplbg) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(aplbg);
      this.addChild(this._backgroundSprite);
    }
  };

  //Scene_Menu
  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("aplearning", this.commandSkillLearning.bind(this));
  };

  Scene_Menu.prototype.commandSkillLearning = function () {
    SceneManager.push(Scene_SkillLearning);
  };

})();
・プラグインコマンドでAP加算
・プラグインコマンドでAP減算
・戦闘終了時にAP加算
・アイテム使用でAP減加算
・装備でAP増加レートを調整