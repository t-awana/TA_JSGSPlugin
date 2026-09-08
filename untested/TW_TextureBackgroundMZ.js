//=============================================================================
// TA_TextureBackground.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Draws a texture on part of the window
 * @author Tamaki Awana
 * @help Adds the function to draw a background based on the 
 * window skin to the Window_Base class.
 * Since it is an API type plug-in,
 * knowledge of JavaScript is required to use it.
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
 */
/*:ja
 * @target MZ
 * @plugindesc ウィンドウの一部にテクスチャを描写します
 * @author 沫那環
 * @help Window_Baseクラスへ、ウィンドウスキンをベースにした
 * 背景を描写できる機能を追加します。
 * APIタイプのプラグインのため、活用にはJavaScriptの知識が
 * 必要となります。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 */
Window_Base.prototype.drawTextureBackground = function (x, y, width, height, bs1op, bs2op) {
  this._textureBGSprites = new Sprite();
  const pd = this.padding;
  this._textureBGSprites.x = pd + x;
  this._textureBGSprites.y = pd + y;
  this.addChildToBack(this._textureBGSprites);
  const backImg = ImageManager.loadSystem("Window");
  let baseSprite1 = new Sprite(new Bitmap(width, height));
  baseSprite1.bitmap.blt(backImg, 0, 0, 95, 95, 0, 0, width, height);
  baseSprite1.opacity = bs1op;
  this._textureBGSprites.addChild(baseSprite1);
  let baseBitmap2 = new Bitmap(96, 96);
  baseBitmap2.blt(backImg, 0, 96, 96, 96, 0, 0);
  let baseSprite2 = new TilingSprite();
  baseSprite2.move(0, 0, width, height);
  baseSprite2.bitmap = baseBitmap2;
  baseSprite2.opacity = bs2op;
  this._textureBGSprites.addChild(baseSprite2);
};
