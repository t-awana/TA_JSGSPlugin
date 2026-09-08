//=============================================================================
// TA_SceneWeaponSmith.js
//=============================================================================
/*:
 * @plugindesc 武器限定の簡易な鍛冶屋機能を実装します。
 * @author Tamaki Awana
 * @help 武器限定の簡易な鍛冶屋機能を実装します。
 * メモタグであらかじめ設定しておいた金額を払って鍛治を
 * 実行すると、1つ次のIDの武器に変化する形で武器を強化します。
 * 次のIDの武器が空白の場合、それ以上の鍛治強化は不可能となります。
 * 
 * 【武器の設定の仕方】
 * アップグレードしたい武器の一群ごとに1つ空白を設ける形で、武器を設定してください。
 * ※防具系では鍛治は出来ません。武器のみとなります。
 * 
 * 【メモタグの設定】
 * <WeaponSmith_NeedGold:必要な金額>
 * 鍛治強化に必要な金額です。
 * 例：<WeaponSmith_NeedGold:1000>
 * 
 * 【プラグインコマンド】
 * WeaponSmith GoldLimit [上限金額]
 * 鍛治強化の上限金額を設定します。
 * 設定しない場合、金額は無制限となります。
 * 
 * WeaponSmith Open
 * 武器鍛治屋を開きます。
 * 
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param WSmithBackground
 * @desc 武器鍛冶屋シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param SmithListWindow
 * @desc 鍛治強化一覧ウィンドウについての設定です。
 * 
 * @param SmithListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのX座標です。
 * @default 0
 * @parent SmithListWindow
 *
 * @param SmithListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのY座標です。
 * @default 108
 * @parent SmithListWindow
 *
 * @param SmithListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの横幅です。
 * @default 408
 * @parent SmithListWindow
 *
 * @param SmithListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの縦幅です。
 * @default 636
 * @parent SmithListWindow
 * 
 * @param SmithListWindow
 * @desc 鍛治強化一覧ウィンドウについての設定です。
 * 
 * @param SmithListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのX座標です。
 * @default 0
 * @parent SmithListWindow
 *
 * @param SmithListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのY座標です。
 * @default 108
 * @parent SmithListWindow
 *
 * @param SmithListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの横幅です。
 * @default 408
 * @parent SmithListWindow
 *
 * @param SmithListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの縦幅です。
 * @default 636
 * @parent SmithListWindow
 * 
 * @param SmithStatusWindow
 * @desc 鍛治強化詳細ウィンドウの設定です。
 * 
 * @param SmithStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウのX座標です。
 * @default 408
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウのY座標です。
 * @default 108
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウの横幅です。
 * @default 408
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウの縦幅です。
 * @default 636
 * @parent SmithStatusWindow
 * 
 * @param GoldWindow
 * @desc 所持金ウィンドウについての設定です。
 * 
 * @param GoldWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 所持金ウィンドウのX座標です。
 * @default 576
 * @parent GoldWindow
 *
 * @param GoldWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 所持金ウィンドウのY座標です。
 * @default 552
 * @parent GoldWindow
 * 
 */
/*:ja
 * @plugindesc 武器限定の簡易な鍛冶屋機能を実装します。
 * @author 沫那環
 * @help 武器限定の簡易な鍛冶屋機能を実装します。
 * メモタグであらかじめ設定しておいた金額を払って鍛治を
 * 実行すると、1つ次のIDの武器に変化する形で武器を強化します。
 * 次のIDの武器が空白の場合、それ以上の鍛治強化は不可能となります。
 * 
 * 【武器の設定の仕方】
 * アップグレードしたい武器の一群ごとに1つ空白を設ける形で、武器を設定してください。
 * ※防具系では鍛治は出来ません。武器のみとなります。
 * 
 * 【メモタグの設定】
 * <WeaponSmith_NeedGold:必要な金額>
 * 鍛治強化に必要な金額です。
 * 例：<WeaponSmith_NeedGold:1000>
 * 
 * 【プラグインコマンド】
 * WeaponSmith GoldLimit [上限金額]
 * 鍛治強化の上限金額を設定します。
 * 設定しない場合、金額は無制限となります。
 * 
 * WeaponSmith Open
 * 武器鍛治屋を開きます。
 * 
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param WSmithBackground
 * @desc 武器鍛冶屋シーンの背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param SmithListWindow
 * @desc 鍛治強化一覧ウィンドウについての設定です。
 * 
 * @param SmithListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのX座標です。
 * @default 0
 * @parent SmithListWindow
 *
 * @param SmithListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウのY座標です。
 * @default 108
 * @parent SmithListWindow
 *
 * @param SmithListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの横幅です。
 * @default 408
 * @parent SmithListWindow
 *
 * @param SmithListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化一覧ウィンドウの縦幅です。
 * @default 636
 * @parent SmithListWindow
 * 
 * @param SmithStatusWindow
 * @desc 鍛治強化詳細ウィンドウの設定です。
 * 
 * @param SmithStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウのX座標です。
 * @default 408
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウのY座標です。
 * @default 108
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウの横幅です。
 * @default 408
 * @parent SmithStatusWindow
 *
 * @param SmithStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 鍛治強化詳細ウィンドウの縦幅です。
 * @default 636
 * @parent SmithStatusWindow
 * 
 * @param GoldWindow
 * @desc 所持金ウィンドウについての設定です。
 * 
 * @param GoldWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 所持金ウィンドウのX座標です。
 * @default 576
 * @parent GoldWindow
 *
 * @param GoldWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 所持金ウィンドウのY座標です。
 * @default 552
 * @parent GoldWindow
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var stbg = String(parameters["WSmithBackground"] || "");

  var stlistwx = Number(parameters["SmithListWindowX"] || 0);
  var stlistwy = Number(parameters["SmithListWindowY"] || 108);
  var stlistwwidth = Number(parameters["SmithListWindowWidth"] || 408);
  var stlistwheight = Number(parameters["SmithListWindowHeight"] || 636);

  var ststuwx = Number(parameters["SmithStatusWindowX"] || 408);
  var ststuwy = Number(parameters["SmithStatusWindowY"] || 108);
  var ststuwwidth = Number(parameters["SmithStatusWindowWidth"] || 408);
  var ststuwheight = Number(parameters["SmithStatusWindowHeight"] || 636);

  var gwx = Number(parameters["GoldWindowX"] || 576);
  var gwy = Number(parameters["GoldWindowY"] || 552);

  //Game_Interpreter
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === "WeaponSmith ") {
        switch (args[0]) {
          case "GoldLimit":
            var limitvalue = Number(args[1]);
            $gameSystem.WS_SetGoldLimit(limitvalue);
            break;
          case 'Open':
            SceneManager.push(Scene_WeaponSmith);
            break;
        }
      }
    }
  };

  //Scene_WeaponSmith
  function Scene_WeaponSmith() {
    this.initialize.apply(this, arguments);
  }

  Scene_WeaponSmith.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_WeaponSmith.prototype.constructor = Scene_WeaponSmith;

  Scene_WeaponSmith.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_WeaponSmith.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createWeaponListWindow();
    this.createWeaponDetailWindow();
    this._weaponListWindow.activate();
    this._weaponListWindow.select(0);
  };

  Scene_WeaponSmith.prototype.createLearningSkillDetailWindow = function () {
    this._weaponDetailWindow = new Window_WeaponDetail();
    this.addWindow(this._weaponDetailWindow);
  };

  Scene_WeaponSmith.prototype.createWeaponListWindow = function () {
    this._weaponListWindow = new Window_WeaponList();
    this._weaponListWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._weaponListWindow);
    this._weaponListWindow.setDetailWindow(this._weaponDetailWindow);
    this._weaponListWindow._weaponindex = this._weaponListWindow.index();
  };

  var _Scene_WeaponSmith_createBackground = Scene_WeaponSmith.prototype.createBackground;
  Scene_WeaponSmith.prototype.createBackground = function () {
      _Scene_WeaponSmith_createBackground.call(this);
    if (stbg) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(stbg);
      this.addChild(this._backgroundSprite);
    }
  };
})();