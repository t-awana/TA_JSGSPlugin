//=============================================================================
// TA_RemoveDuplicateAnimationMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Prevents multiple animation playback.
 * @author Tamaki Awana
 * @help By installing this plugin, 
 * you can prevent multiple animations 
 * from playing multiple times.
 * Please use it when you want to 
 * reduce the load on the game.
 * 
 * Plugin Commands:  
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * This plugin is based on a of
Trb's RMMV plugin 
 * "RemoveDuplicateAnimations".
 * Thanks to Trb.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アニメーションの多重再生を防ぎます。
 * @author 沫那環
 * @help このプラグインを導入することで、アニメーションの多重再生を防ぎます。
 * ゲームの負荷軽減を図りたい時にどうぞ。
 * 
 *【プラグインコマンドについて】
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、Trbさん作のRPGツクール
 * MV用プラグイン「RemoveDuplicateAnimations」を
 * 参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 * 
 */

(() => {
    Spriteset_Base.prototype.createAnimation = function (request) {
        let beforeAnimeId = 0;
        let beforeAnimeMirror = false;
        const animation = $dataAnimations[request.animationId];
        const targets = request.targets;
        const mirror = request.mirror;
        let delay = this.animationBaseDelay();
        const nextDelay = this.animationNextDelay();
        const dwatk = BattleManager._action.subject().isDualWield() && request.mirror != beforeAnimeMirror;
        const manyanime = BattleManager._action.item().meta.ManyAnime;
        if (this.isAnimationForEach(animation)) {
            for (const target of targets) {
                if (request.animationId != beforeAnimeId || dwatk || manyanime) {
                    this.createAnimationSprite([target], animation, mirror, delay);
                    delay += nextDelay;
                    beforeAnimeId = request.animationId;
                    beforeAnimeMirror = mirror;
                }
            }
        } else {
            if (request.animationId != beforeAnimeId || dwatk) {
                this.createAnimationSprite(targets, animation, mirror, delay);
                beforeAnimeId = request.animationId;
                beforeAnimeMirror = mirror;
            }
        }
    };
})();