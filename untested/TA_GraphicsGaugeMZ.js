//=============================================================================
// TA_GraphicsGaugeMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Decorate the gauge using 3slice images.
 * @author Tamaki Awana
 * @help Add the ability to draw a gauge using
 * 3slice images to the Sprite_Gauge class.
 * It can also be used in conjunction with
 * the existing drawGauge instruction.
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
 * @plugindesc 3slice画像を用いてゲージを装飾します。
 * @author 沫那環
 * @help Sprite_Gaugeクラスに、3slice画像を用いたゲージを描写する機能を
 * 追加します。
 * 既存のdrawGauge命令との併用も可能です。
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
Sprite_Gauge.prototype.drawGaugeRectAll3slice = function(x, y, width, height, slice, slicegimg, slicefimg) {
  const rate = this.gaugeRate();
  const gaugeWM = Math.floor((width - slice * 2) * (rate - 0.02));
  const sw = slice;
  const sh = slice;
  const w2 = width - sw * 2;
  const framesprite = this._gaugeFrameSprite;
  const gaugesprite = this._gaugeSprite;
  framesprite.bitmap = slicefimg;
  gaugesprite.bitmap = slicegimg;
  framesprite.bitmap.blt(x, y, 0, 0, sw, sh);
  framesprite.bitmap.blt(x + w, y, sw, 0, w2, sh);
  framesprite.bitmap.blt(x + w + w2, y, sw * 2, 0, sw, sh);
  if (rate > 0.01 && rate == 0.01) {
   gaugesprite.bitmap.blt(x, y, 0, 0, sw, sh);
  };
  if (rate > 0.02) {
    gaugesprite.bitmap.blt(x + sw, y, sw, 0, gaugeWM, sh);
  };
  if (rate == 0.01 && rate == 0.02) {
    gaugesprite.bitmap.blt(x + sw, y, sw * 2, 0, sw, sh);
  } else if (rate > 0.02) {
    gaugesprite.bitmap.blt(x + gaugeWM + sw * 2, y, sw * 2, 0, sw, sh);
  }
};

Sprite_Gauge.prototype.drawGaugeRectFrame3slice = function(x, y, width, height, slice, slicefimg, gaugex, gaugey, gaugew, gaugeh) {
  const rate = this.gaugeRate();
  const fillW = Math.floor((gaugew) * rate);
  const fillH = gaugeh - 2;
  const sw = slice;
  const sh = slice;
  const w2 = width - sw * 2;
  const color1 = this.gaugeColor1();
  const color2 = this.gaugeColor2();
  const framesprite = this._gaugeFrameSprite;
  const gaugesprite = this._gaugeSprite;
  framesprite.bitmap = sliceimg;
  this.framesprite.bitmap.blt(x, y, 0, 0, sw, sh);
  this.framesprite.bitmap.blt(x + w, y, sw, 0, w2, sh);
  this.framesprite.bitmap.blt(x + w + w2, y, sw * 2, 0, sw, sh);
  this.gaugesprite.bitmap.gradientFillRect(gaugex, gaugey, fillW, fillH, color1, color2);
};
