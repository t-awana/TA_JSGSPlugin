/*:
 * @target MZ
 * @plugindesc TPB penalty fix
 * @author Tamaki Awana
 *
 * @help
 * The penalty for failing to escape in TPB will be reset to 0% in the charge time.
 * You install this plugin prevents the icon from getting out of place,
 *  when you are installed time line type TPB plugins and escape fails.
 *
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0 Release
 * 
 * ---
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc TPBペナルティ改良
 * @author 沫那環
 *
 * @help
 * TPBで逃走失敗時に受けるペナルティを、チャージタイムを0％へリセットする仕様にします。
 * このプラグインを導入すると、タイムライン型のTPBプラグインで逃走失敗した時、
 * アイコンの位置がはみ出てしまうことを防ぎます。
 *
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.0 公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 */

(() => {
  _Game_Battler_applyTpbPenalty = Game_Battler.prototype.applyTpbPenalty;
  Game_Battler.prototype.applyTpbPenalty = function () {
    _Game_Battler_applyTpbPenalty.call(this);
    this._tpbChargeTime = 0;
  };
})();
