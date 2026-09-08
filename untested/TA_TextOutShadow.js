//=============================================================================
// TA_TextOutShadow.js
//=============================================================================
/*:
 * @plugindesc Set the text outline and shadow.
 * @author Tamaki Awana
 * @help You can set the text outline and shadow,
 * set the color of the outline and shadow,
 * and set the outline thickness.
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
 * @param TextOutlineShow
 * @desc Set the text outline.
 * @type select
 * @option Setting RGBA
 * @value rgba
 * @option Setting text color
 * @value textcolor
 * @option None
 * @value none
 * @default rgba
 * 
 * @param TextOutlineWidth
 * @desc The width of the text outline.
 * @type number
 * @default 4
 * @parent TextOutlineShow
 * 
 * @param TextOutlineTC
 * @desc The text color to set for the outline.
 * @default 19
 * @parent TextOutlineShow
 * 
 * @param TextOutlineTCOpacity
 * @desc The opacity of the text color outline.
 * @type number
 * @max 255
 * @default 128
 * @parent TextOutlineTC
 * 
 * @param TextOutlineRGBA
 * @desc This is the RGBA value set for the outline.
 * @default 0, 0, 0, 0.5
 * @parent TextOutlineShow
 * 
 * @param TextShadowShow
 * @desc Set the text shadow.
 * @type select
 * @option Setting RGBA
 * @value rgba
 * @option Setting text color
 * @value textcolor
 * @option none
 * @value none
 * @default none
 * 
 * @param TextShadowTC
 * @desc The text color to set for the shadow.
 * @default 19
 * @parent TextShadowShow
 * 
 * @param TextShadowTCOpacity
 * @desc The opacity of the text color shadow.
 * @type number
 * @max 255
 * @default 128
 * @parent TextShadowTC
 * 
 * @param TextShadowRGBA
 * @desc This is the RGBA value set for the shadow.
 * @default 0, 0, 0, 0.5
 * @parent TextShadowShow
 * 
 */
/*:ja
 * @plugindesc テキストのアウトラインとシャドウを設定します。
 * @author 沫那環
 * @help テキストのアウトラインやシャドウの有無、
 * アウトラインやシャドウのカラーの設定、
 * アウトラインの太さの設定ができます。
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
 * @param TextOutlineShow
 * @desc テキストのアウトラインについて設定します。
 * @type select
 * @option RGBAで設定する
 * @value rgba
 * @option テキストカラーで設定する
 * @value textcolor
 * @option 表示しない
 * @value none
 * @default rgba
 * 
 * @param TextOutlineWidth
 * @desc テキストのアウトラインの太さです。
 * @type number
 * @default 4
 * @parent TextOutlineShow
 * 
 * @param TextOutlineTC
 * @desc アウトラインに設定するテキストカラーです。
 * @default 19
 * @parent TextOutlineShow
 * 
 * @param TextOutlineTCOpacity
 * @desc テキストカラーアウトラインの透明度です。
 * @type number
 * @max 255
 * @default 128
 * @parent TextOutlineTC
 * 
 * @param TextOutlineRGBA
 * @desc アウトラインに設定するRGBAの値です。
 * @default 0, 0, 0, 0.5
 * @parent TextOutlineShow
 * 
 * @param TextShadowShow
 * @desc テキストのシャドウについて設定します。
 * @type select
 * @option RGBAで設定する
 * @value rgba
 * @option テキストカラーで設定する
 * @value textcolor
 * @option 表示しない
 * @value none
 * @default none
 * 
 * @param TextShadowTC
 * @desc シャドウに設定するテキストカラーです。
 * @default 19
 * @parent TextShadowShow
 * 
 * @param TextShadowTCOpacity
 * @desc テキストカラーシャドウの透明度です。
 * @type number
 * @max 255
 * @default 128
 * @parent TextShadowTC
 * 
 * @param TextShadowRGBA
 * @desc シャドウに設定するRGBAの値です。
 * @default 0, 0, 0, 0.5
 * @parent TextShadowShow
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

var olshow = String(parameters["TextOutlineShow"] || "rgba");
var olwidth = Number(parameters["TextOutlineWidth"] || 4);
var oltc = Number(parameters["TextOutlineTC"] || 19);
var oltcop = Number(parameters["TextOutlineTCOpacity"] || 128);
var olrgba = String(parameters["TextOutlineRGBA"] || "0, 0, 0, 0.5");
var shshow = String(parameters["TextShadowShow"] || "none");
var shtc = Number(parameters["TextShadowTC"] || 19);
var shtcop = Number(parameters["TextShadowTCOpacity"] || 128);
var shrgba = String(parameters["TextShadowRGBA"] || "0, 0, 0, 0.5");

var Bitmap.prototype.initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    _Bitmap_initialize.call(this, width, height);
    if (olshow == "textcolor") {
      var outlinecolortc = this.getTextColor(oltc);
      var outlinecolortcop = oltcop;
      this.outlineColor = 'rgba(outlinecolortc, outlinecolortcop)';
    } else if (olshow == "rgba") {
      var outlinecolorrgba = olrgba;
      this.outlineColor = 'rgba(outlinecolorrgba)';
    } else if (olshow == "none") {
       this.outlineColor = 'rgba(0, 0, 0, 0)';
    };
    this.outlineWidth = olwidth;
    if (shshow == "textcolor") {
      var shadowcolortc = this.getTextColor(oltc);
      var shadowcolortcop = shtcop;
      this.shadowColor = 'rgba(shadowcolortc, shadowcolortcop)';
    } else if (shshow == "rgba") {
      var shadowcolorrgba = shrgba;
      this.shadowColor = 'rgba(outlinecolorrgba)';
    } else if (olshow == "none") {
       this.shadowColor = 'rgba(0, 0, 0, 0)';
    };
};

  Bitmap.prototype.getTextColor = function(n) {
    var windowskin = ImageManager.loadSystem('Window');
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return windowskin.getPixel(px, py);
};

  _Bitmap._drawTextOutline = Bitmap.prototype._drawTextOutline;
  Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    _Bitmap._drawTextOutline.call(this, tx, ty, maxWidth);
    var context = this._context;
    context.strokeStyle = this.shadowColor;
    context.lineWidth = this.outlineWidth;
    context.lineJoin = 'round';
    context.strokeText(text, tx + outlineWidth, ty + outlineWidth, maxWidth);
    context.fillStyle = this.shadowColor;
    context.fillText(text, tx + outlineWidth, ty + outlineWidth, maxWidth);
};

})();
