//=============================================================================
// TA_GraphicsGauge.js
//=============================================================================
/*:
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
 * @plugindesc 3slice画像を用いてゲージを装飾します。
 * @author 沫那環
 * @help Window_Baseクラスに、3slice画像を用いたゲージを描写する機能を
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
Window_Base.prototype.drawGaugeAll3slice = function(x, y, rate, width, height, slice, slicegimg, slicefimg) {
  var gaugeWM = Math.floor((width - slice * 2) * (rate - 0.02));
  var sw = slice;
  var sh = slice;
  var w2 = width - sw * 2;
  if (slicefimg) {
    spriteGaugeFrame.bitmap = slicefimg;
  };
  spriteGauge.bitmap = slicegimg;
  this.contents.spriteGaugeFrame.bitmap.blt(x, y, 0, 0, sw, sh);
  this.contents.spriteGaugeFrame.bitmap.blt(x + w, y, sw, 0, w2, sh);
  this.contents.spriteGaugeFrame.bitmap.blt(x + w + w2, y, sw * 2, 0, sw, sh);
  if (rate > 0.01 && rate == 0.01) {
   this.contents.spriteGauge.bitmap.blt(x, y, 0, 0, sw, sh);
  };
  if (rate > 0.02) {
    this.contents.spriteGauge.bitmap.blt(x + sw, y, sw, 0, gaugeWM, sh);
  };
  if (rate == 0.01 && rate == 0.02) {
    this.contents.spriteGauge.bitmap.blt(x + sw, y, sw * 2, 0, sw, sh);
  } else if (rate > 0.02) {
    this.contents.spriteGauge.bitmap.blt(x + gaugeWM + sw * 2, y, sw * 2, 0, sw, sh);
  }
};

Window_Base.prototype.drawGaugeFill3slice = function(x, y, rate, width, height, slice, slicefimg, gaugex, gaugey, gaugew, gaugeh, color1, color2) {
  var fillW = Math.floor(gaugew * rate);
  var sw = slice;
  var sh = slice;
  var w2 = width - sw * 2;
    spriteGaugeFrame.bitmap = slicefimg;
  spriteGauge.bitmap = nil;
  this.contents.spriteGaugeFrame.bitmap.blt(x, y, 0, 0, sw, sh);
  this.contents.spriteGaugeFrame.bitmap.blt(x + w, y, sw, 0, w2, sh);
  this.contents.spriteGaugeFrame.bitmap.blt(x + w + w2, y, sw * 2, 0, sw, sh);
  this.contents.spriteGauge.gradientFillRect(gaugex, gaugey, fillW, gaugeh, color1, color2);
};
