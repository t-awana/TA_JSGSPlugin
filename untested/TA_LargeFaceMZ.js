//=============================================================================
// TA_LargeFaceMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Use large face graphics in message windows.
 * @author Tamaki Awana
 * @help  Use large face graphics in message windows.
 * Standard size 144*144 face graphics can also be used.
 * 
 * How to use:
 * Please insert a cut out face graphic of any size into img/face.
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
 * @param LargeFaceLetter
 * @desc Suffix for large face graphic recognition.
 * @default _L
 * 
 * @param LargeFaceWidth
 * @desc Width per large face graphic.
 * @type number
 * @min 1
 * @max 9007
 * @default 144
 * 
 * @param LargeFaceHeight
 * @desc Height per large face graphic.
 * @type number
 * @min 1
 * @max 9007
 * @default 144
 * 
*/
/*:ja
 * @target MZ
 * @plugindesc 会話ウィンドウで大きな顔グラフィックを使用します。
 * @author 沫那環
 * @help  会話ウィンドウで大きな顔グラフィックを使用します。
 * 144*144の標準サイズの顔グラフィックも併用することが可能です。
 * 
 * 【使用方法】
 * img/faceに、任意のサイズで切り出した顔グラフィックを入れてください。
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
 * @param LargeFaceLetter
 * @desc 大型顔グラフィック認識用の接尾語です。
 * @default _L
 * 
 * @param LargeFaceWidth
 * @desc 大型顔グラフィック1つあたりの幅です。
 * @type number
 * @min 1
 * @max 9007
 * @default 144
 * 
 * @param LargeFaceHeight
 * @desc 大型顔グラフィック1つあたりの高さです。
 * @type number
 * @min 1
 * @max 9007
 * @default 144
 * 
*/
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const lfacel = String(parameters["LargeFaceLetter"] || "_L");
  const lfacew = Number(parameters["LargeFaceWidth"] || 144);
  const lfaceh = Number(parameters["LargeFaceHeight"] || 144);

Window_Message.prototype.drawFace = function(
    faceName, faceIndex, x, y, width, height
) {
    width = width || lfacew;
    height = height || lfaceh;
    const bitmap = ImageManager.loadFace(faceName + lfacel);
    const pw = lfacew;
    const ph = lfaceh;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};
})();
