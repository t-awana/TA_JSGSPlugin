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
 * whether to blur the background displayed under the translucent picture, and
 * setting to darken the background of game end screen.
 * 
 * How to use:
 * Put image file want to using for background in img/picture,
 * and select picture on plugin parameter "Background Image".
 * The size of the image should be the same as the size of the game screen.
 * Even if you don't set a background image,
 * you can still set the blur and darken background functions.
 *
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 *
 * Update History:
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
 * @default MenuBack
 *
 * @param Background Opacity
 * @desc Opacity of background image
 * @type number
 * @min 0
 * @default 224
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
 * 加えて、一枚絵の下に表示される背景のぼかしの有無や、
 * メニュー画面やゲーム終了画面の背景を暗くするかどうかの設定もできるようにしました。
 * 
 * 【使い方】
 * img/pictureフォルダに、背景として使用したい画像を入れて、
 * プラグインパラメータのBackground Imageから背景画像を選択してください。
 * 画像はゲームの画面サイズと同じ大きさにしてください。
 * ぼかしの有無と、背景を暗くする機能の切り替えは、背景画像を設定しなくても設定可能です。
 *
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
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
 * @default MenuBack
 *
 * @param Background Opacity
 * @desc 背景画像の透明度
 * @type number
 * @min 0
 * @default 224
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
      this._backgroundSprite2 = new Sprite();
      this._backgroundSprite2.bitmap = ImageManager.loadPicture(BgImg);
      this._backgroundSprite2.opacity = BgOpacity;
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
