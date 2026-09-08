//=============================================================================
// TA_LevelUpWindowMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 戦闘後のレベルアップ時に詳細ウィンドウを表示します。
 * @author Tamaki Awana
 * @help 戦闘後のレベルアップ時に、詳細を記したウィンドウを表示します。
 * 別途メモタグで指定することで、ウィンドウに立ち絵を表示することが
 * 出来ます。
 * 指定しない場合、顔グラフィックを表示します。
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラスのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<LevelUpPortrait:ファイル名>
 * 　立ち絵ファイルを指定します。
 * 　立ち絵ファイルはimg/pictureに格納してください。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param LvUpShowInMap
 * @type boolean
 * @desc マップ上でレベルアップウィンドウを表示します。
 * @on 表示する
 * @off 表示しない
 * @default false
 * 
 * @param LevelUpWindow
 * @desc レベルアップウィンドウの設定です。
 * 
 * @param LevelUpWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc レベルアップウィンドウのX座標です。
 * @default 136
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc レベルアップウィンドウのY座標です。
 * @default 136
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc レベルアップウィンドウの横幅です。
 * @default 536
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc レベルアップウィンドウの縦幅です。
 * @default 344
 * @parent LevelUpWindow
 * 
 * @param NewSkillWindow
 * @desc 新規習得スキルウィンドウの設定です。
 * 
 * @param NewSkillWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 新規習得スキルウィンドウのX座標です。
 * @default 160
 * @parent NewSkillWindow
 *
 * @param NewSkillWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 新規習得スキルウィンドウのY座標です。
 * @default 250
 * @parent NewSkillWindow
 *
 * @param NewSkillWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 新規習得スキルウィンドウの横幅です。
 * @default 488
 * @parent NewSkillWindow
 * 
 * @param NewSkillText
 * @desc 新規にスキルを習得する際に表示されるテキストです。
 * @default 新しいスキルを習得した！
 * @parent NewSkillWindow
 * 
*/
/*:ja
 * @target MZ
 * @plugindesc 戦闘後のレベルアップ時に詳細ウィンドウを表示します。
 * @author 沫那環
 * @help 戦闘後のレベルアップ時に、詳細を記したウィンドウを表示します。
 * 別途メモタグで指定することで、ウィンドウに立ち絵を表示することが
 * 出来ます。
 * 指定しない場合、顔グラフィックを表示します。
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラスのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<LevelUpPortrait:ファイル名>
 * 　立ち絵ファイルを指定します。
 * 　立ち絵ファイルはimg/pictureに格納してください。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.0.1   構築版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param LvUpShowInMap
 * @type boolean
 * @desc マップ上でレベルアップウィンドウを表示します。
 * @on 表示する
 * @off 表示しない
 * @default false
 * 
 * @param LevelUpWindow
 * @desc レベルアップウィンドウの設定です。
 * 
 * @param LevelUpWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc レベルアップウィンドウのX座標です。
 * @default 136
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc レベルアップウィンドウのY座標です。
 * @default 136
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc レベルアップウィンドウの横幅です。
 * @default 536
 * @parent LevelUpWindow
 *
 * @param LevelUpWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc レベルアップウィンドウの縦幅です。
 * @default 344
 * @parent LevelUpWindow
 * 
 * @param NewSkillWindow
 * @desc 新規習得スキルウィンドウの設定です。
 * 
 * @param NewSkillWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 新規習得スキルウィンドウのX座標です。
 * @default 160
 * @parent NewSkillWindow
 *
 * @param NewSkillWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 新規習得スキルウィンドウのY座標です。
 * @default 250
 * @parent NewSkillWindow
 *
 * @param NewSkillWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 新規習得スキルウィンドウの横幅です。
 * @default 488
 * @parent NewSkillWindow
 * 
 * @param NewSkillText
 * @desc 新規にスキルを習得する際に表示されるテキストです。
 * @default 新しいスキルを習得した！
 * @parent NewSkillWindow
 * 
*/
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const lupshowinmap = String(parameters["LevelUpShowInMap"] || "false");

  const lupwx = Number(parameters["LevelUpWindowX"] || 136);
  const lupwy = Number(parameters["LevelUpWindowY"] || 136);
  const lupwwidth = Number(parameters["LevelUpWindowWidth"] || 536);
  const lupwheight = Number(parameters["LevelUpWindowHeight"] || 344);

  const newswx = Number(parameters["NewSkillWindowX"] || 160);
  const newswy = Number(parameters["NewSkillWindowY"] || 250);
  const newswwidth = Number(parameters["NewSkillWindowWidth"] || 488);
  const newskilltext = String(parameters["NewSkillText"]);

  //Window_LevelUp
  function Window_LevelUp() {
    this.initialize.apply(this, arguments);
  }

  Window_LevelUp.prototype = Object.create(Window_Base.prototype);
  Window_LevelUp.prototype.constructor = Window_LevelUp;

  //Window_NewSkill
  function Window_NewSkill() {
    this.initialize.apply(this, arguments);
  }

  Window_NewSkill.prototype = Object.create(Window_Base.prototype);
  Window_NewSkill.prototype.constructor = Window_NewSkill;

})();