//=============================================================================
// TranslucentMenuBack.js
//=============================================================================
/*:
 * @plugindesc Implement a transparent menu background
 * @author Tamaki Awana
 * @help
 * Implement a function to depict a transparent background
 * overlaid on the menu screen.
 * In addition, adding a function that allows you to set
 * whether to blur the map displayed under the translucent picture, and
 * setting to darken the background of game end screen.
 * 
 * How to use:
 * Put image file want to using for background in img/picture,
 * and select picture on plugin parameter "Background Image".
 * If you set an image smaller than the screen size,
 * it will be displayed side by side in tiles.
 * Even if you don't set a background image,
 * you can still set the blur and darken background functions.
 *
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 *
 * Update History:
 * ver.1.1.1 Corrected help typographical errors
 * ver.1.1 Tiling background supported
 *         Added function changing blend mode of background
 *         Bug fix: That could not be set to a state where
 *                  there is no background image
 * ver.1.0.1 English Supported
 * ver.1.0 Release
 *
 * ---
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param Background Image
 * @desc Background image that use in menu scene
 * @type file
 * @require 1
 * @dir img/pictures
 * @default 
 *
 * @param Background Opacity
 * @desc Opacity of background image
 * @type number
 * @min 0
 * @default 224
 * 
 * @param Background Blend Mode
 * @desc Blend mode of background image
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 *
 * @param Background Blur
 * @desc Whether to blur the lower part of the background
 * @on Blur
 * @off Don't blur
 * @default true
 * @type boolean
 *
 * @param Dark Background on GameEnd
 * @desc Whether to darken the background of the game end screen
 * @on Darken
 * @off Don't darken
 * @default true
 * @type boolean
 */
/*:ja
 * @plugindesc 透けるメニュー背景を実装します。
 * @author 沫那環
 * @help
 * メニュー画面に、透ける背景を重ねて描写する機能を実装します。
 * 加えて、背景の下に表示されるマップ画面のぼかしの有無や、
 * メニュー画面やゲーム終了画面の背景を暗くするかどうかの設定もできるようにしました。
 * 
 * 【使い方】
 * img/pictureフォルダに、背景として使用したい画像を入れて、
 * プラグインパラメータのBackground Imageから背景画像を選択してください。
 * 画像はゲームの画面サイズと同じ大きさにしてください。
 * 画面サイズより小さいサイズの画像を設定した場合、タイル状に並べて表示します。
 * ぼかしの有無と、背景を暗くする機能の切り替えは、背景画像を設定しなくても設定可能です。
 *
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.1.1 ヘルプの誤植を訂正
 * ver1.1 タイル状の背景表示に対応
 *        背景画像の合成方法を選べる機能を追加
 *        背景画像がない状態に設定できなかった不具合を修正
 * ver.1.0.1 英語に対応
 * ver.1.0 公開
 *
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param Background Image
 * @desc メニュー画面の背景に使用する画像
 * @type file
 * @require 1
 * @dir img/pictures
 * @default 
 *
 * @param Background Opacity
 * @desc 背景画像の透明度
 * @type number
 * @min 0
 * @default 224
 *
 * @param Background Blend Mode
 * @desc 背景画像の合成方法
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 * 
 * @param Background Blur
 * @desc 背景の下層部分にぼかしをかけるか
 * @on ぼかす
 * @off ぼかさない
 * @default true
 * @type boolean
 *
 * @param Dark Background on GameEnd
 * @desc ゲーム終了画面の背景を暗くするか
 * @on 暗くする
 * @off 暗くしない
 * @default true
 * @type boolean
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);
  var BgImg = parameters["Background Image"] || "";
  var BgOpacity = Number(parameters["Background Opacity"] || 224);
  var BgBlendMode = Number(parameters["Background Blend Mode"] || 0);
  var BgBlur = String(parameters["Background Blur"] || "true");
  var GEBgDark = String(parameters["Dark Background on GameEnd"] || "true");

  SceneManager.snapForBackground = function () {
    this._backgroundBitmap = this.snap();
    if (String(BgBlur) == "true") {
      this._backgroundBitmap.blur();
    }
  };

  var _Scene_MenuBase_createBackground =
    Scene_MenuBase.prototype.createBackground;
  Scene_MenuBase.prototype.createBackground = function () {
    if (!BgImg) {
      _Scene_MenuBase_createBackground.call(this);
    } else {
      _Scene_MenuBase_createBackground.call(this);
      this._backgroundSprite2 = new TilingSprite();
      this._backgroundSprite2.move(0, 0, Graphics.width, Graphics.height);
      this._backgroundSprite2.bitmap = ImageManager.loadPicture(BgImg);
      this._backgroundSprite2.opacity = BgOpacity;
      this._backgroundSprite2.blendMode = BgBlendMode;
      this.addChild(this._backgroundSprite2);
    }
  };

  Scene_GameEnd.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (String(GEBgDark) == "true") {
      this.setBackgroundOpacity(128);
    }
  };
})();
