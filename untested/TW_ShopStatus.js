//=============================================================================
// TA_ShopStatus.js
//=============================================================================
/*:
 * @plugindesc ショップステータスウィンドウを改変します。
 * @author Tamaki Awana
 * @help 各キャラクターのキャラチップも表示できるように、ショップステータスウィンドウを改変します。
 * また、まっつUP氏作のRPGツクールMV用プラグイン
 * 「MagicItem」に対応しています。
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
 * @param ShopStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ショップステータスウィンドウのX座標です。
 * @default 408
 *
 * @param ShopStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ショップステータスウィンドウのY座標です。
 * @default 180
 *
 * @param ShopStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ショップステータスウィンドウの横幅です。
 * @default 408
 *
 * @param ShopStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ショップステータスウィンドウの縦幅です。
 * @default 444
 * 
 * @param EquipStatusPageSize
 * @type number
 * @desc ショップステータスを表示する最大人数です。
 * @default 4
 *
 * @param ParametersList
 * @desc 表示したい能力値のリストです。
 * @type struct<ParamList>[]
 * @default ["{\"ParameterId\":\"2\",\"ParamNameSST\":\"ATK\"}","{\"ParameterId\":\"3\",\"ParamNameSST\":\"DEF\"}","{\"ParameterId\":\"4\",\"ParamNameSST\":\"MAT\"}","{\"ParameterId\":\"5\",\"ParamNameSST\":\"MDF\"}","{\"ParameterId\":\"6\",\"ParamNameSST\":\"AGI\"}","{\"ParameterId\":\"7\",\"ParamNameSST\":\"LUK\"}"]
 *
 * @param ParametersNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の項目名の幅です。
 * @default 80
 *
 * @param ParametersValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の値の幅です。
 * @default 48
 *
 * @param ParamName_ActorsDataMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の項目名とアクターの能力値データの間隔です。
 * @default 10
 *
 * @param ActorCharacterWidth
 * @type number
 * @min 1
 * @max 9007
 * @desc キャラチップの幅です。
 * @default 48
 *
 * @param ActorCharacterHeight
 * @type number
 * @min 1
 * @max 9007
 * @desc キャラチップの高さです。
 * @default 48
 *
 * @param ActorCharactersMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクターどうしの間隔です。
 * @default 6
 *
 * @param EquipedSymbol
 * @type select
 * @option テキスト
 * @value Text
 * @option アイコン
 * @value Icon
 * @desc 装備済のアイテムに表示するシンボルです。
 * @default Text
 *
 * @param EquipedSymbolText
 * @desc 装備済のテキストです。
 * @default E
 * @parent EquipedSymbol
 *
 * @param EquipedSymbolTextColor
 * @type number
 * @desc 装備済のテキストのカラーです。
 * @default 0
 * @parent EquipedSymbol
 *
 * @param EquipedSymbolIcon
 * @type number
 * @desc 装備済のアイコンです。
 * @default 81
 * @parent EquipedSymbol
 *
 * @param EquipDisableSymbol
 * @type select
 * @option テキスト
 * @value Text
 * @option アイコン
 * @value Icon
 * @desc 装備不可能のアイテムに表示するシンボルです。
 * @default Text
 *
 * @param EquipDisableSymbollText
 * @desc 装備不可能のテキストです。
 * @default X
 * @parent EquipDisableSymbol
 *
 * @param EquipDisableSymbolTextColor
 * @type number
 * @desc 装備不可能のテキストのカラーです。
 * @default 17
 * @parent EquipDisableSymbol
 *
 * @param EquipDisableSymbolIcon
 * @type number
 * @desc 装備不可能のアイコンです。
 * @default 304
 * @parent EquipDisableSymbol
 *
 * @param ScopeHeadperText
 * @desc アイテムの効果範囲の用語一覧です。
 * @default 効果範囲
 *
 * @param ScopeTerms
 * @desc アイテムの効果範囲の用語一覧です。
 * @type []
 * @default ["なし","敵単体","敵全体","敵1体ランダム","敵2体ランダム","敵3体ランダム","敵4体ランダム","味方単体","味方全体","味方単体（戦闘不能）","味方全体（戦闘不能）","使用者"]
 *
 * @param OccasionHeaderText
 * @desc アイテムの使用可能時の用語一覧です。
 * @default 使用可能時
 *
 * @param OccasionTerms
 * @desc アイテムの使用可能時の用語一覧です。
 * @type []
 * @default ["常時","戦闘画面","メニュー画面","使用不可"]
 *
 * @param RecoveryHeaderText
 * @desc アイテムの回復量の見出しのテキストです。
 * %1：パラメーターの略語
 * @default %1回復量
 *
 * @param RecoveryTextMaxHMPRate
 * @desc 最大HPやMPに基づいた回復量のテキストです。
 * %1：HPやMPの略語  %2：回復率
 * @default 最大%1の%2%
 *
 * @param ConjunctionFixedAndMaxHMPRate
 * @desc 接続語
 * @default +
 *
 * @param TPRecoveryRateUnit
 * @desc 単位
 * @default %
 *
 * @param AddStateHeaderText
 * @desc ステート付与効果の見出しのテキストです。
 * @default 状態付与
 *
 * @param RemoveStateHeaderText
 * @desc ステート除去効果の見出しのテキストです。
 * @default 状態解除
 *
 * @param UseMPHeaderText
 * @desc アイテムのMPコストの見出しのテキストです。
 * %1：MPの略語
 * @default %1使用量
 */
/*~struct~ParamList:ja
 * @param ParameterId
 * @type select
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * @desc 表示させたい能力値のIDです。
 *
 * @param ParamNameSST
 * @desc ショップステータスウィンドウでの能力値の用語です。
 * 空欄でデフォルトの用語を使用します。
 * @default
 */
/*:ja
 * @plugindesc ショップステータスウィンドウを改変します。
 * @author 沫那環
 * @help 各キャラクターのキャラチップも表示できるように、ショップステータスウィンドウを改変します。
 * また、まっつUP氏作のRPGツクールMV用プラグイン
 * 「MagicItem」に対応しています。
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
 * @param ShopStatusWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ショップステータスウィンドウのX座標です。
 * @default 408
 *
 * @param ShopStatusWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ショップステータスウィンドウのY座標です。
 * @default 180
 *
 * @param ShopStatusWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ショップステータスウィンドウの横幅です。
 * @default 408
 *
 * @param ShopStatusWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ショップステータスウィンドウの縦幅です。
 * @default 444
 * 
 * @param EquipStatusPageSize
 * @type number
 * @desc ショップステータスを表示する最大人数です。
 * @default 4
 *
 * @param ParametersList
 * @desc 表示したい能力値のリストです。
 * @type struct<ParamList>[]
 * @default ["{\"ParameterId\":\"2\",\"ParamNameSST\":\"ATK\"}","{\"ParameterId\":\"3\",\"ParamNameSST\":\"DEF\"}","{\"ParameterId\":\"4\",\"ParamNameSST\":\"MAT\"}","{\"ParameterId\":\"5\",\"ParamNameSST\":\"MDF\"}","{\"ParameterId\":\"6\",\"ParamNameSST\":\"AGI\"}","{\"ParameterId\":\"7\",\"ParamNameSST\":\"LUK\"}"]
 *
 * @param ParametersNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の項目名の幅です。
 * @default 80
 *
 * @param ParametersValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の値の幅です。
 * @default 48
 *
 * @param ParamName_ActorsDataMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の項目名とアクターの能力値データの間隔です。
 * @default 10
 *
 * @param ActorCharacterWidth
 * @type number
 * @min 1
 * @max 9007
 * @desc キャラチップの幅です。
 * @default 48
 *
 * @param ActorCharacterHeight
 * @type number
 * @min 1
 * @max 9007
 * @desc キャラチップの高さです。
 * @default 48
 *
 * @param ActorCharactersMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc キャラクターどうしの間隔です。
 * @default 6
 *
 * @param EquipedSymbol
 * @type select
 * @option テキスト
 * @value Text
 * @option アイコン
 * @value Icon
 * @desc 装備済のアイテムに表示するシンボルです。
 * @default Text
 *
 * @param EquipedSymbolText
 * @desc 装備済のテキストです。
 * @default E
 * @parent EquipedSymbol
 *
 * @param EquipedSymbolTextColor
 * @type number
 * @desc 装備済のテキストのカラーです。
 * @default 0
 * @parent EquipedSymbol
 *
 * @param EquipedSymbolIcon
 * @type number
 * @desc 装備済のアイコンです。
 * @default 81
 * @parent EquipedSymbol
 *
 * @param EquipDisableSymbol
 * @type select
 * @option テキスト
 * @value Text
 * @option アイコン
 * @value Icon
 * @desc 装備不可能のアイテムに表示するシンボルです。
 * @default Text
 *
 * @param EquipDisableSymbollText
 * @desc 装備不可能のテキストです。
 * @default X
 * @parent EquipDisableSymbol
 *
 * @param EquipDisableSymbolTextColor
 * @type number
 * @desc 装備不可能のテキストのカラーです。
 * @default 17
 * @parent EquipDisableSymbol
 *
 * @param EquipDisableSymbolIcon
 * @type number
 * @desc 装備不可能のアイコンです。
 * @default 304
 * @parent EquipDisableSymbol
 *
 * @param ScopeHeadperText
 * @desc アイテムの効果範囲の用語一覧です。
 * @default 効果範囲
 *
 * @param ScopeTerms
 * @desc アイテムの効果範囲の用語一覧です。
 * @type []
 * @default ["なし","敵単体","敵全体","敵1体ランダム","敵2体ランダム","敵3体ランダム","敵4体ランダム","味方単体","味方全体","味方単体（戦闘不能）","味方全体（戦闘不能）","使用者"]
 *
 * @param OccasionHeaderText
 * @desc アイテムの使用可能時の用語一覧です。
 * @default 使用可能時
 *
 * @param OccasionTerms
 * @desc アイテムの使用可能時の用語一覧です。
 * @type []
 * @default ["常時","戦闘画面","メニュー画面","使用不可"]
 *
 * @param RecoveryHeaderText
 * @desc アイテムの回復量の見出しのテキストです。
 * %1：パラメーターの略語
 * @default %1回復量
 *
 * @param RecoveryTextMaxHMPRate
 * @desc 最大HPやMPに基づいた回復量のテキストです。
 * %1：HPやMPの略語  %2：回復率
 * @default 最大%1の%2%
 *
 * @param ConjunctionFixedAndMaxHMPRate
 * @desc 接続語
 * @default +
 *
 * @param TPRecoveryRateUnit
 * @desc 単位
 * @default %
 *
 * @param AddStateHeaderText
 * @desc ステート付与効果の見出しのテキストです。
 * @default 状態付与
 *
 * @param RemoveStateHeaderText
 * @desc ステート除去効果の見出しのテキストです。
 * @default 状態解除
 *
 * @param UseMPHeaderText
 * @desc アイテムのMPコストの見出しのテキストです。
 * %1：MPの略語
 * @default %1使用量
 */
/*~struct~ParamList:ja
 * @param ParameterId
 * @type select
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * @desc 表示させたい能力値のIDです。
 *
 * @param ParamNameSST
 * @desc ショップステータスウィンドウでの能力値の用語です。
 * 空欄でデフォルトの用語を使用します。
 * @default
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  function StructConvert(basestruct) {
    return JSON.parse(
      JSON.stringify(basestruct, function (key, value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          try {
            return eval(value);
          } catch (e) {
            return value;
          }
        }
      })
    );
  }

  var sswx = Number(parameters["ShopStatusWindowX"] || 408);
  var sswy = Number(parameters["ShopStatusWindowY"] || 180);
  var sswwidth = Number(parameters["ShopStatusWindowWidth"] || 408);
  var sswheight = Number(parameters["ShopStatusWindowHeight"] || 444);

  var parambase = parameters["ParametersList"];
  var params = StructConvert(parambase);

  var eqstpsize = Number(parameters["EquipStatusPageSize"] || 4);
  var paramnw = Number(parameters["ParametersNameWidth"] || 80);
  var paramvw = Number(parameters["ParametersValueWidth"] || 48);
  var paramnadm = Number(parameters["ParamName_ActorsDataMargin"] || 10);
  var acchmg = Number(parameters["ActorCharactersMargin"] || 6);
  var acw = Number(parameters["ActorCharacterWidth"] || 48);
  var ach = Number(parameters["ActorCharacterHeight"] || 48);
  var eqdsymbol = parameters["EquipedSymbol"] || "Text";
  var eqdstxt = parameters["EquipedSymbolText"] || "E";
  var eqdstcolor = Number(parameters["EquipedSymbolTextColor"] || 0);
  var eqdsticon = Number(parameters["EquipedSymbolIcon"] || 81);
  var diseqsymbol = parameters["EquipDisableSymbol"] || "Text";
  var diseqstxt = parameters["EquipDisableSymbolText"] || "X";
  var diseqdstcolor = Number(parameters["EquipDisableSymbolTextColor"] || 17);
  var diseqdsicon = Number(parameters["EquipDisableSymbolIcon"] || 304);
  var scopehtext = parameters["ScopeHeadperText"];
  var scopebase = parameters["ScopeTerms"];
  var scorpterm = StructConvert(scopebase);
  var occhtext = parameters["OccasionHeaderText"];
  var occbase = parameters["OccasionTerms"];
  var occterm = StructConvert(occbase);
  var rechtext = parameters["RecoveryHeaderText"];
  var mhmprrectext = parameters["RecoveryTextMaxHMPRate"];
  var conjfixmhmpr = parameters["ConjunctionFixedAndMaxHMPRate"];
  var mhmprrectext = parameters["RecoveryTextMaxHMPRate"];
  var tprecunit = parameters["TPRecoveryRateUnit"];
  var addsthtext = parameters["AddStateHeaderText"];
  var remsthtext = parameters["RemoveStateHeaderText"];
  var umphtext = parameters["UseMPHeaderText"];

  Window_ShopStatus.prototype.refresh = function () {
    var lh = this.lineHeight();
    this.contents.clear();
    if (this._item) {
      var x = this.textPadding();
      this.drawPossession(x, 0);
      this.contents.paintOpacity = 48;
      this.contents.fillRect(0, lh + lh / 2 - 1, this.contentsWidth(), 2, this.normalColor());
      this.contents.paintOpacity = 255;
      if (this.isEquipItem()) {
        this.drawEquipInfo(x, this.lineHeight() * 2);
      } else {
        this.drawItemInfo(x, this.lineHeight() * 2);
      }
    }
  };

  Window_ShopStatus.prototype.drawPossession = function (x, y) {
    var width = this.contents.width - this.textPadding() - x;
    var possessionWidth = this.textWidth("0000");
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText($gameParty.numItems(this._item), x, y, width, "right");
  };

  Window_ShopStatus.prototype.drawEquipInfo = function (x, y) {
    var members = this.statusMembers();
    var lh = this.lineHeight();
    var y2 = y + ach + lh / 2;
    rownum = 0;
    colw = Math.max(acw, paramvw);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.equip, x, y2, paramnw);
    for (var i = 0; i < params.length; i++) {
      var paramId = params[i].ParameterId;
      var paramname = "";
      this.changeTextColor(this.systemColor());
      if (params[i].ParamNameSST) {
        paramname = params[i].ParamNameSST;
      } else {
        paramname = TextManager.param(paramId);
      }
      this.drawText(paramname, x, y2 + lh * (i + 1), paramnw);
      this.resetTextColor();
      rownum += 1;
    }
    this.resetTextColor();
    for (var i = 0; i < members.length; i++) {
      var actor = members[i];
      var colx = paramnw + paramnadm + x + colw * i + acchmg * i;
      var enabled = actor.canEquip(this._item);
      this.changePaintOpacity(enabled);
      if (acw > paramvw) {
        this.drawActorCharacter(actor, Math.floor(colx + acw / 2 + (paramvw - acw) / 2), y2);
      } else {
        this.drawActorCharacter(actor, colx + Math.floor(paramvw / 2), y2);
      }
      this.changePaintOpacity(true);
      this.drawActorEquipInfo(colx, y2, actor);
    }
  };

  Window_ShopStatus.prototype.drawActorCharacter = function (actor, x, y) {
    var bitmap = ImageManager.loadCharacter(actor.characterName());
    var big = ImageManager.isBigCharacter(actor.characterName());
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = actor.characterIndex();
    var sx = ((n % 4) * 3 + 1) * pw;
    var sy = Math.floor(n / 4) * 4 * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
  };

  Window_ShopStatus.prototype.drawActorEquipInfo = function (x, y, actor) {
    var lh = this.lineHeight();
    var rownum = 0;
    var enabled = actor.canEquip(this._item);
    var ibw = Window_Base._iconWidth;
    var ibh = Window_Base._iconHeight;
    this.resetTextColor();
    var item1 = this.currentEquippedItem(actor, this._item.etypeId);
    if (this._item === item1) {
      if (eqdsymbol == "Text") {
        this.changeTextColor(this.textColor(eqdstcolor));
        this.drawText(eqdstxt, x, y, colw, "center");
        this.resetTextColor();
      } else {
        this.drawIcon(eqdsticon, x + Math.floor((colw - ibw) / 2), y + Math.floor((lh - ibh) / 2));
      }
    } else if (enabled == false) {
      if (diseqsymbol == "Text") {
        this.changeTextColor(this.textColor(diseqdstcolor));
        this.drawText(diseqstxt, x, y + lh * rownum, paramvw, "center");
        this.resetTextColor();
      } else {
        this.drawIcon(diseqdsicon, x + Math.floor((colw - ibw) / 2), y + Math.floor((lh - ibh) / 2));
      }
    }
    rownum += 1;
    for (var i = 0; i < params.length; i++) {
      var paramId = params[i].ParameterId;
      this.changePaintOpacity(enabled);
      if (enabled) {
        this.drawActorParamChange(x, y + lh * rownum, actor, item1, paramId);
      } else {
        this.drawText("-", x, y + lh * rownum, paramvw, "center");
      }
      this.changePaintOpacity(true);
      rownum += 1;
    }
  };

  Window_ShopStatus.prototype.drawActorParamChange = function (x, y, actor, item1, paramId) {
    var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
    this.changeTextColor(this.paramchangeTextColor(change));
    this.drawText((change > 0 ? "+" : "") + change, x, y, paramvw, "center");
  };

  Window_ShopStatus.prototype.drawItemInfo = function (x, y) {
    var lh = this.lineHeight();
    var rownum = 0;
    var ief = this._item.effects;
    this.drawItemScope(this._item, x, y);
    rownum += 1;
    this.drawItemOccasion(this._item, x, y + lh * rownum);
    rownum += 1;
    var hprec = { v1: 0, v2: 0 };
    var mprec = { v1: 0, v2: 0 };
    var tprec = 0;
    var addst = new Array();
    var addbuff = new Array();
    var adddebuff = new Array();
    var remst = new Array();
    var rembuff = new Array();
    var remdebuff = new Array();
    var mpItem = 0;
    if (ief.length > 0) {
      for (var i = 0; i < ief.length; i++) {
        if (ief[i].code == 11) {
          hprec.v1 += ief[i].value1;
          hprec.v2 += ief[i].value2;
        } else if (ief[i].code == 12) {
          mprec.v1 += ief[i].value1;
          mprec.v2 += ief[i].value2;
        } else if (ief[i].code == 13) {
          tprec += ief[i].value1;
        } else if (ief[i].code == 21) {
          addst.push(ief[i].dataId);
        } else if (ief[i].code == 22) {
          remst.push(ief[i].dataId);
        } else if (ief[i].code == 31) {
          addbuff.push(ief[i].dataId);
        } else if (ief[i].code == 32) {
          adddebuff.push(ief[i].dataId);
        } else if (ief[i].code == 33) {
          rembuff.push(ief[i].dataId);
        } else if (ief[i].code == 34) {
          remdebuff.push(ief[i].dataId);
        }
      }
    }
    if ($dataItems[this._item.id].meta["MIpay"]) {
      mpItem = Number($dataItems[this._item.id].meta["MIpay"]);
    }
    if (hprec.v1 !== 0 || hprec.v2 !== 0 || $dataItems[this._item.id].meta.HPRecoverText) {
      this.drawHpRecover(hprec.v1, hprec.v2, x, y + lh * rownum);
      rownum += 1;
    }
    if (mprec.v1 !== 0 || mprec.v2 !== 0 || $dataItems[this._item.id].meta.MPRecoverText) {
      this.drawMpRecover(mprec.v1, mprec.v2, x, y + lh * rownum);
      rownum += 1;
    }
    if (tprec !== 0) {
      this.drawTpRecover(tprec, x, y + lh * rownum);
      rownum += 1;
    }
    if (mpItem !== 0) {
      this.drawMpUse(mpItem, x, y + lh * rownum);
      rownum += 1;
    }
    if (addst.length > 0 || addbuff.length > 0 || adddebuff.length > 0) {
      var addsticons = new Array();
      var addbufficons = new Array();
      var adddebufficons = new Array();
      for (var i = 0; i < addst.length; i++) {
        addsticons.push($dataStates[addst[i]].iconIndex);
      }
      for (var i = 0; i < addbuff.length; i++) {
        addbufficons.push(Game_BattlerBase.ICON_BUFF_START + addbuff[i]);
      }
      for (var i = 0; i < adddebuff.length; i++) {
        addbufficons.push(Game_BattlerBase.ICON_DEBUFF_START + adddebuff[i]);
      }
      var addicons = addsticons.concat(addbufficons, adddebufficons);
      this.drawAddStates(addicons, x, y + lh * rownum);
      rownum += 2;
    }
    if (remst.length > 0 || rembuff.length > 0 || remdebuff.length > 0) {
      var remsticons = new Array();
      var rembufficons = new Array();
      var remdebufficons = new Array();
      for (var i = 0; i < remst.length; i++) {
        remsticons.push($dataStates[remst[i]].iconIndex);
      }
      for (var i = 0; i < rembuff.length; i++) {
        rembufficons.push(Game_BattlerBase.ICON_BUFF_START + rembuff[i]);
      }
      for (var i = 0; i < remdebuff.length; i++) {
        remdebufficons.push(Game_BattlerBase.ICON_DEBUFF_START + remdebuff[i]);
      }
      var remicons = remsticons.concat(rembufficons, remdebufficons);
      this.drawRemoveStates(remicons, x, y + lh * rownum);
      rownum += 2;
    }
  };

  Window_ShopStatus.prototype.drawItemScope = function (item, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(scopehtext, x, y, 120);
    this.resetTextColor();
    var scopetext = scorpterm[item.scope];
    this.drawText(scopetext, x + 140, y, this.contentsWidth() - 140 - x);
  };

  Window_ShopStatus.prototype.drawItemOccasion = function (item, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(occhtext, x, y, 120);
    this.resetTextColor();
    var occtext = occterm[item.occasion];
    this.drawText(occtext, x + 140, y, this.contentsWidth() - 140 - x);
  };

  Window_ShopStatus.prototype.drawHpRecover = function (value1, value2, x, y) {
    var percent = Math.floor(value1 * 100);
    var result = "";
    this.changeTextColor(this.systemColor());
    this.drawText(rechtext.format(TextManager.hpA), x, y, 120);
    this.resetTextColor();
    if (value1 !== 0) {
      result = mhmprrectext.format(TextManager.hpA, percent);
    }
    if (value1 !== 0 && value2 !== 0) {
      result += conjfixmhmpr;
    }
    if (value2 !== 0) {
      result += value2;
    }
    if (this._item.meta.HPRecoverText) {
      result = this._item.meta.HPRecoverText;
    }
    this.drawText(result, x + 140, y, this.contentsWidth() - x - 140);
  };

  Window_ShopStatus.prototype.drawMpRecover = function (value1, value2, x, y) {
    var percent = Math.floor(value1 * 100);
    var result = "";
    this.changeTextColor(this.systemColor());
    this.drawText(rechtext.format(TextManager.mpA), x, y, 120);
    this.resetTextColor();
    if (value1 !== 0) {
      result = mhmprrectext.format(TextManager.mpA, percent);
    }
    if (value1 !== 0 && value2 !== 0) {
      result += conjfixmpr;
    }
    if (value2 !== 0) {
      result += value2;
    }
    if (this._item.meta.MPRecoverText) {
      result = this._item.meta.MPRecoverText;
    }
    this.drawText(result, x + 140, y, this.contentsWidth() - x - 140);
  };

  Window_ShopStatus.prototype.drawTpRecover = function (value, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(rechtext.format(TextManager.tpA), x, y, 120);
    this.resetTextColor();
    this.drawText(value + tprecunit, x + 140, y, this.contentsWidth() - x - 140);
  };

  Window_ShopStatus.prototype.drawMpUse = function (value, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(umphtext.format(TextManager.mpA), x, y, 120);
    this.resetTextColor();
    this.drawText(value, x + 140, y, this.contentsWidth() - x - 140);
  };

  Window_ShopStatus.prototype.drawAddStates = function (icons, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(addsthtext, x, y, 120);
    this.resetTextColor();
    var iw = Window_Base._iconWidth + 4;
    var lh = this.lineHeight();
    var iconcols = Math.floor(this.contentsWidth() / iw);
    for (var i = 0; i < icons.length; i++) {
      var x2 = x + iw * (i % iconcols);
      var y2 = y + lh * (Math.floor(i / iconcols) + 1);
      this.drawIcon(icons[i], x2, y2);
    }
  };

  Window_ShopStatus.prototype.drawRemoveStates = function (icons, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(remsthtext, x, y, 120);
    this.resetTextColor();
    var iw = Window_Base._iconWidth + 4;
    var lh = this.lineHeight();
    var iconcols = Math.floor(this.contentsWidth() / iw);
    for (var i = 0; i < icons.length; i++) {
      var x2 = x + iw * (i % iconcols);
      var y2 = y + lh * (Math.floor(i / iconcols) + 1);
      this.drawIcon(icons[i], x2, y2);
    }
  };

  Window_ShopStatus.prototype.pageSize = function () {
    return eqstpsize;
  };

  Scene_Shop.prototype.createStatusWindow = function() {
    var wx = sswx;
    var wy = sswy;
    var ww = sswwidth;
    var wh = sswheight;
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this._statusWindow.opacity = sswop;
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
  };
})();
