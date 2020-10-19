//=============================================================================
// MSP_AllOffPatchMZ.js
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc MultiSoundPlayerで設定したサウンドを終了時などに一括で解除します。
 * @author 沫那環(Tamaki Awana)
 *
 * @help n2naokun(柊菜緒)さんMV版作、リクドウさん移植の、
 * RPGツクールMZプラグイン素材「MultiSoundPlayer」に、
 * タイトル画面移行時やセーブデータのロード時の暗転に
 * 設定していたサウンドを一括解除する機能を追加します。
 * MultiSoundPlayer直下にこのプラグインを導入するだけで使えます。
 * ※このプラグイン単体では使えません！
 * 
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.0 公開
 * 
 * ---
 * 
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 */
(() => {
        const _Scene_Base_fadeOutAll = Scene_Base.prototype.fadeOutAll;
        Scene_Base.prototype.fadeOutAll = function() {
            //ExSoundに収めている識別子全ての名前を、配列としてExSList作って突っ込む
            let ExSList = Object.keys(ExSound);
            //識別子の個数もExSLenに突っ込む
            let ExSLen = ExSList.length
            //識別子の個数もExSLenに突っ込む
            let i = 0;
            while (ExSLen > 0){
            //ExSoundに収めている配列に対応する識別子を、頭から削って、
            //配列の個数を取得するを繰り返すという頭の悪い処理なんで、誰か上手に書き直して欲しい……
                if (ExSoundBuffer[String(ExSList[0])]) {
                    ExSoundBuffer[String(ExSList[0])].stop();
                    ExSoundBuffer[String(ExSList[0])] = null;
                    delete ExSoundBuffer[String(ExSList[0])];
                    ExSound[String(ExSList[0])] = null;
                    delete ExSound[String(ExSList[0])];
                    ExSoundType[String(ExSList[0])] = null;
                    delete ExSoundType[String(ExSList[0])];
                    //ExSListに収められた配列は頭から消していく
                    ExSList.shift();
                    //配列の個数を再取得
                    ExSLen = ExSList.length
                };
            };
        //fadeOutAllの元の処理を呼び出す
        _Scene_Base_fadeOutAll.call(this)
        };
})();
