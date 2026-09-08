//=============================================================================
// TA_SceneWeaponSmithMZ.js
//=============================================================================
/*:
 * @target MZ
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
 * 武器鍛冶屋の上限金額設定 上限金額
 * 鍛治強化の上限金額を設定します。
 * 設定しない場合、金額は無制限となります。
 * 
 * 武器鍛冶屋を開く
 * 武器鍛治屋シーンを開きます。
 * 
 * 
 * 【更新履歴】
 * 　ver.0.2   初期開発版公開
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
 * @command WeaponSmithGoldLimit
 * @text 武器鍛冶屋の上限金額設定
 * @desc 武器鍛冶屋に上限金額を設定します。
 *
 * @arg LimitValue
 * @type number
 * @default 0
 * @text 上限金額
 * @desc 上限金額の値です。
 * 
 * @command WeaponSmithOpen
 * @text 武器鍛冶屋を開く
 * @desc 武器鍛冶屋を開きます。
 * 
 */
/*:ja
 * @target MZ
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
 * 武器鍛冶屋の上限金額設定 上限金額
 * 鍛治強化の上限金額を設定します。
 * 設定しない場合、金額は無制限となります。
 * 
 * 武器鍛冶屋を開く
 * 武器鍛治屋シーンを開きます。
 * 
 * 
 * 【更新履歴】
 * 　ver.0.2   初期開発版公開
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
 * @command WeaponSmithGoldLimit
 * @text 武器鍛冶屋の上限金額設定
 * @desc 武器鍛冶屋に上限金額を設定します。
 *
 * @arg LimitValue
 * @type number
 * @default 0
 * @text 上限金額
 * @desc 上限金額の値です。
 * 
 * @command WeaponSmithOpen
 * @text 武器鍛冶屋を開く
 * @desc 武器鍛冶屋を開きます。
 * 
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const stbg = String(parameters["WSmithBackground"] || "");

  const stlistwx = Number(parameters["SmithListWindowX"] || 0);
  const stlistwy = Number(parameters["SmithListWindowY"] || 108);
  const stlistwwidth = Number(parameters["SmithListWindowWidth"] || 408);
  const stlistwheight = Number(parameters["SmithListWindowHeight"] || 636);

  const ststuwx = Number(parameters["SmithStatusWindowX"] || 408);
  const ststuwy = Number(parameters["SmithStatusWindowY"] || 108);
  const ststuwwidth = Number(parameters["SmithStatusWindowWidth"] || 408);
  const ststuwheight = Number(parameters["SmithStatusWindowHeight"] || 636);

  const gwx = Number(parameters["GoldWindowX"] || 576);
  const gwy = Number(parameters["GoldWindowY"] || 552);

  //Plugin Commands
  PluginManager.registerCommand(pluginName, "WeaponSmithGoldLimit", args) => {
    const limitvalue = Number(args.LimitValue);
    $gameSystem.WS_SetGoldLimit(limitvalue);
  });

  PluginManager.registerCommand(pluginName, "WeaponSmithOpen", args => {
     SceneManager.push(Scene_WeaponSmith);
  });

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

  const _Scene_WeaponSmith_createBackground = Scene_WeaponSmith.prototype.createBackground;
  Scene_WeaponSmith.prototype.createBackground = function () {
      _Scene_WeaponSmith_createBackground.call(this);
    if (stbg) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(stbg);
      this.addChild(this._backgroundSprite);
    }
  };
})();