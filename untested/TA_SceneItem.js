//=============================================================================
// TA_SceneItem.js
//=============================================================================
/*:
 * @plugindesc アイテム画面を大規模に改変します。
 * @author Tamaki Awana
 * @help アイテム画面を大規模に改変します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・アイテムカテゴリウィンドウが縦式になります。
 * ・アイテムのカテゴリ分類をより細分化します。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SceneItemBackground
 * @desc アイテム画面の背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param SceneItemForeground
 * @desc アイテム画面の前景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param ItemCategoryWindow
 * @descアイテムカテゴリウィンドウについての設定です。
 * 
 * @param ItemCategoryWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムカテゴリウィンドウのX座標です。
 * @default 0
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムカテゴリウィンドウのY座標です。
 * @default 108
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムカテゴリウィンドウの横幅です。
 * @default 180
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムカテゴリウィンドウの縦幅です。
 * @default 420
 * @parent ItemCategoryWindow
 * 
 * @param ItemCategoryWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc アイテムカテゴリウィンドウの透明度です。
 * @default 255
 * @parent ItemCategoryWindow
 * 
 * @param ItemNames
 * @desc 各アイテムの名称です。
 * @parent ItemCategoryWindow
 * 
 * @param ItemName
 * @desc アイテムの名称です。空欄の場合、システム標準の用語を使用します。
 * @default アイテム
 * @parent ItemNames
 * 
 * @param WeaponName
 * @desc 武器の名称です。空欄の場合、システム標準の用語を使用します。
 * @default 武器
 * @parent ItemNames
 * 
 * @param SieldName
 * @desc 盾の名称です。
 * @default 盾
 * @parent ItemNames
 * 
 * @param HelmetName
 * @desc ヘルメットの名称です。
 * @default ヘルメット
 * @parent ItemNames
 * 
 * @param ArmorName
 * @desc 鎧の名称です。空欄の場合、システム標準の用語を使用します。
 * @default 鎧
 * @parent ItemNames
 * 
 * @param AccessoryName
 * @desc アクセサリーの名称です。
 * @default アクセサリー
 * @parent ItemNames
 * 
 * @param KeyItemName
 * @desc 大事なものの名称です。空欄の場合、システム標準の用語を使用します。
 * @default 大事なもの
 * @parent ItemNames
 * 
 * @param ItemListWindow
 * @descアイテムリストウィンドウについての設定です。
 * 
 * @param ItemListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムリストウィンドウのX座標です。
 * @default 180
 * @parent ItemListWindow
 *
 * @param ItemListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムリストウィンドウのY座標です。
 * @default 108
 * @parent ItemListWindow
 *
 * @param ItemListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムリストウィンドウの横幅です。
 * @default 696
 * @parent ItemListWindow
 *
 * @param ItemListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムリストウィンドウの縦幅です。
 * @default 516
 * @parent ItemListWindow
 * 
 * @param ItemListWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc アイテムリストウィンドウの透明度です。
 * @default 255
 * @parent ItemListWindow
 * 
 * @param ItemListWindowColumns
 * @type number
 * @min 1
 * @max 9007
 * @desc アイテムリストウィンドウの列数です。
 * @default 2
 * @parent ItemListWindow
 * 
 */
/*:ja
 * @plugindesc アイテム画面を大規模に改変します。
 * @author 沫那環
 * @help アイテム画面を大規模に改変します。
 * 主な変更点は以下の通りとなります。
 * 
 * ・アイテムカテゴリウィンドウが縦式になります。
 * ・アイテムのカテゴリ分類をより細分化します。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0   公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SceneItemBackground
 * @desc アイテム画面の背景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param SceneItemForeground
 * @desc アイテム画面の前景です。
 * 「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * 
 * @param ItemCategoryWindow
 * @descアイテムカテゴリウィンドウについての設定です。
 * 
 * @param ItemCategoryWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムカテゴリウィンドウのX座標です。
 * @default 0
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムカテゴリウィンドウのY座標です。
 * @default 108
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムカテゴリウィンドウの横幅です。
 * @default 180
 * @parent ItemCategoryWindow
 *
 * @param ItemCategoryWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムカテゴリウィンドウの縦幅です。
 * @default 420
 * @parent ItemCategoryWindow
 * 
 * @param ItemCategoryWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc アイテムカテゴリウィンドウの透明度です。
 * @default 255
 * @parent ItemCategoryWindow
 * 
 * @param ItemNames
 * @desc 各アイテムの名称です。
 * @parent ItemCategoryWindow
 * 
 * @param ItemName
 * @desc アイテムの名称です。空欄の場合、システム標準の用語を使用します。
 * @default アイテム
 * @parent ItemNames
 * 
 * @param WeaponName
 * @desc 武器の名称です。空欄の場合、システム標準の用語を使用します。
 * @default 武器
 * @parent ItemNames
 * 
 * @param SieldName
 * @desc 盾の名称です。
 * @default 盾
 * @parent ItemNames
 * 
 * @param HelmetName
 * @desc ヘルメットの名称です。
 * @default ヘルメット
 * @parent ItemNames
 * 
 * @param ArmorName
 * @desc 鎧の名称です。空欄の場合、システム標準の用語を使用します。
 * @default 鎧
 * @parent ItemNames
 * 
 * @param AccessoryName
 * @desc アクセサリーの名称です。
 * @default アクセサリー
 * @parent ItemNames
 * 
 * @param KeyItemName
 * @desc 大事なものの名称です。空欄の場合、システム標準の用語を使用します。
 * @default 大事なもの
 * @parent ItemNames
 * 
 * @param ItemListWindow
 * @descアイテムリストウィンドウについての設定です。
 * 
 * @param ItemListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムリストウィンドウのX座標です。
 * @default 180
 * @parent ItemListWindow
 *
 * @param ItemListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc アイテムリストウィンドウのY座標です。
 * @default 108
 * @parent ItemListWindow
 *
 * @param ItemListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムリストウィンドウの横幅です。
 * @default 696
 * @parent ItemListWindow
 *
 * @param ItemListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc アイテムリストウィンドウの縦幅です。
 * @default 516
 * @parent ItemListWindow
 * 
 * @param ItemListWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc アイテムリストウィンドウの透明度です。
 * @default 255
 * @parent ItemListWindow
 * 
 * @param ItemListWindowColumns
 * @type number
 * @min 1
 * @max 9007
 * @desc アイテムリストウィンドウの列数です。
 * @default 2
 * @parent ItemListWindow
 * 
 */
(function () {
  var pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  var parameters = PluginManager.parameters(pluginName);

  var itembg = String(parameters["SceneItemBackground"] || "");
  var itemfg = String(parameters["SceneItemForeground"] || "");

  var itemcwx = Number(parameters["ItemCategoryWindowX"] || 0);
  var itemcwy = Number(parameters["ItemCategoryWindowY"] || 108);
  var itemcwwidth = Number(parameters["ItemCategoryWindowWidth"] || 180);
  var itemcwheight = Number(parameters["ItemCategoryWindowHeight"] || 420);                 
  var itemcwop = Number(parameters["ItemCategoryWindowOp"] || 255);

  var name_item = String(parameters["ItemName"]);
  var name_wpn = String(parameters["WeaponName"]);
  var name_sld = String(parameters["SieldName"]);
  var name_hlm = String(parameters["HelmetName"]);
  var name_armr = String(parameters["ArmorName"]);
  var name_accs = String(parameters["AccessoryName"]);
  var name_keyitem = String(parameters["KeyItemName"]);

  var itemlistx = Number(parameters["ItemListWindowX"] || 180);
  var itemlisty = Number(parameters["ItemListWindowY"] || 108);
  var itemlistwidth = Number(parameters["ItemListWindowWidth"] || 696);
  var itemlistheight = Number(parameters["ItemListWindowHeight"] || 516);
  var itemlistop = Number(parameters["ItemListWindowOp"] || 255);
  var itemlistcl = Number(parameters["ItemListWindowColumns"] || 2);

  function Window_ItemCategoryTall() {
    this.initialize.apply(this, arguments);
  }

  Window_ItemCategoryTall.prototype = Object.create(Window_Command.prototype);
  Window_ItemCategoryTall.prototype.constructor = Window_ItemCategoryTall;

  Window_ItemCategoryTall.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
  };

  Window_ItemCategoryTall.prototype.windowWidth = function () {
    return itemcwwidth;
  };

  Window_ItemCategoryTall.prototype.windowHeight = function () {
    return itemcwheight;
  };

  Window_ItemCategoryTall.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (this._itemWindow) {
      this._itemWindow.setCategory(this.currentSymbol());
    }
  };

  Window_ItemCategoryTall.prototype.maxRows = function () {
    return 7;
  };

  Window_ItemCategoryTall.prototype.makeCommandList = function () {
    var itemname = "";
    var wpnname = "";
    var sldname = "";
    var hlmname = "";
    var armname = "";
    var accsname = "";
    var keyitemname = "";
    if (name_item) {
      itemname = name_item;
    } else {
      itemname = TextManager.item;
    };
    if (name_wpn) {
      wpnname = name_item;
    } else {
      wpnname = TextManager.weapon,;
    };
    if (name_sld) {
      sldname = name_sld;
    };
    if (name_hlm) {
      hlmname = name_hlm;
    };
    if (name_armr) {
      armname = name_arm;
    } else {
      armname = TextManager.armor;
    };
    if (name_accs) {
      accsname = name_accs;
    };
    if (keyname_item) {
      keyitemname = name_keyitem;
    } else {
      keyitemname = TextManager.keyItem;
    };
    this.addCommand(itemname, 'item');
    this.addCommand(wpnname, 'weapon');
    this.addCommand(sldname, 'shield');
    this.addCommand(hlmname, 'helmet');
    this.addCommand(armrname, 'armor');
    this.addCommand(accsname, 'accessory');
    this.addCommand(keyitemname, 'keyItem');
  };

  Window_ItemCategoryTall.prototype.setItemWindow = function (itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
  };

  function Window_ItemListShort() {
    this.initialize.apply(this, arguments);
  }

  Window_ItemListShort.prototype = Object.create(Window_ItemList.prototype);
  Window_ItemListShort.prototype.constructor = Window_ItemListShort;

  Window_ItemListShort.prototype.maxCols = function () {
    return itemlistcl;
  };

  Window_ItemListShort.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
        return DataManager.isWeapon(item);
    case 'sield':
        return DataManager.isArmor(item)  && item.etypeId == 1;
    case 'helmet':
        return DataManager.isArmor(item)  && item.etypeId == 2;
    case 'armor':
        return DataManager.isArmor(item)  && item.etypeId == 3;
    case 'accesory':
        return DataManager.isArmor(item)  && item.etypeId == 4;
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
  };

  Window_ItemListShort.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
  };

  Scene_Item.prototype.createCategoryWindow = function () {
    this._categoryWindow = new Window_ItemCategoryTall();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.x = itemcwx;
    this._categoryWindow.y = itemcwy;
    this._categoryWindow.width = itemcwwidth;
    this._categoryWindow.height = itemcwheight;
    this._categoryWindow.opacity = itemcwop;
    this._categoryWindow.setHandler("ok", this.   onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
  };

  Scene_Item.prototype.createItemWindow = function () {
    var wx = itemlistx;
    var wy = itemlisty;
    var ww = itemlistwidth;
    var wh = itemlistheight;
    this._itemWindow = new Window_ItemListShort(wx, wy, ww, wh);
    this._itemWindow.opacity = itemlistop;
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
  };
})();
