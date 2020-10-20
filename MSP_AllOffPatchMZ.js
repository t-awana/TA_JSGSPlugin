//=============================================================================
// MSP_AllOffPatchMZ.js
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc MultiSoundPlayerで設定したサウンドを終了時などに一括で解除します。
 * @author 沫那環(Tamaki Awana)
 *
 * @base MultiSoundPlayer
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
 * ver.1.0.1 コードの記述を改良（Plasma Darkさん、ありがとうございます）
 *           機能自体に変化はありません。
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
  Scene_Base.prototype.fadeOutAll = function () {
    //ExSoundに収めている識別子全ての名前を、配列としてExSList作って突っ込む
    const exSoundIdList = Object.keys(ExSound);
    exSoundIdList.forEach((exSoundId) => deleteSound(exSoundId));
    //fadeOutAllの元の処理を呼び出す
    _Scene_Base_fadeOutAll.call(this);
  };

  /**
   * 指定したサウンドを削除する（元プラグインのUtility.delSoundを移植）
   * @param {string|number} soundId サウンドID
   */
  function deleteSound(soundId) {
    if (ExSoundBuffer[String(soundId)]) {
      // バッファ削除
      ExSoundBuffer[String(soundId)].stop();
      ExSoundBuffer[String(soundId)] = null;
      delete ExSoundBuffer[String(soundId)];
      // サウンド情報の削除
      ExSound[String(soundId)] = null;
      delete ExSound[String(soundId)];
      // サウンドタイプの削除
      ExSoundType[String(soundId)] = null;
      delete ExSoundType[String(soundId)];
    }
  }
})();

