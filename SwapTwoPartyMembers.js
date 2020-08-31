//=============================================================================
// SwapTwoPartyMembers.js
//=============================================================================

/*:
 * @plugindesc ver.1.0 2人パーティーの時、並び替えを選ぶと直ちに2人を入れ替えるようにします。
 * @author 沫那環(Tamaki Awana)
 *
 * @help　2人パーティーの時、メニュー画面で並び替えを選ぶと、
 * 直ちに2人の順番を入れ替えるようにします。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、
 * Toru Higurumaさん（https://github.com/neofuji）のRGSS3素材
 * 「メニューのアクター選択省略」を参考にさせていただきました。
 * この場を借りて、お礼を申し上げます。
 */

(function() {

    var _Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
    Scene_Menu.prototype.commandFormation = function() {
    if ($gameParty.size() === 2) {
        $gameParty.swapOrder(0,1)
        this._statusWindow.refresh();
        this._commandWindow.activate();
        return
    };
        _Scene_Menu_commandFormation.call(this);
    };

})();
