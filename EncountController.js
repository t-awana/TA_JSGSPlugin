//=============================================================================
// EncountController.js
//=============================================================================

 /*:ja
 * @plugindesc ver1.0 エンカウント率調整
 * @author 沫那環(Tamaki Awana)
 * @help  設定した変数に代入された値に応じて、自動でエンカウント率を調整します。
 * 標準の計算式は、ツクール標準のものよりエンカウントの頻度が抑えられた、
 * 0～乱数の最大値 + マップに設定された敵出現歩数
 * となります。
 * 
 * 【使い方】
 * EncountVariableで設定した変数に、以下の値を代入すると、
 * エンカウント率を算出する式をその場で変更することができます。
 * 0：標準（0～乱数の最大値 + マップに設定された敵出現歩数）
 * 1：少な目（0～乱数の最大値*2 + マップに設定された敵出現歩数）
 * 2：多め（ツクール標準）
 * 計算式をもっと細かく調節したい場合や、
 * もっと設定項目を増やしたい場合は、このプラグインのソースコードを
 * 改変してください。
 * 
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.0 公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、kotonoha*さんのブログ
 * 「RPＧツクールMVで感動ものを作る。」の記事
 * 「ストレスフリーなランダムエンカウントを目指す」を参考にしました。
 * http://ktnhmv.jugem.jp/?eid=8
 * この場を借りて、御礼を申し上げます。
 * 
 * 
 * @param EncountVariable
 * @desc エンカウント率の調整を判定する変数を設定します。
 * @default 0
 * 
 * @param EncountRate
 * @desc エンカウント率を調整する乱数の最大値
 * @default 5
 */

(function() {
   var parameters = PluginManager.parameters('EncountController');
   var EncountVariable = Number(parameters['EncountVariable'] || 0);
   var EncountRate = Number(parameters['EncountRate'] || 5);

   Game_Player.prototype.makeEncounterCount = function() {
      var n = $gameMap.encounterStep();
      var enr = EncountRate
      if (EncountVariable != 0){
         if ($gameVariables.value(EncountVariable) === 0) {
            this._encounterCount = Math.randomInt(enr) + n;
         } else if($gameVariables.value(EncountVariable) === 1){
            this._encounterCount = (Math.randomInt(enr) * 2) + n;
         } else if($gameVariables.value(EncountVariable) === 2){
            this._encounterCount = Math.randomInt(enr) + Math.randomInt(enr) + 1;
         };
      };
   };
   
})();
