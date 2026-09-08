//=============================================================================
// TA_ShopCategoryMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ショップ購入時の商品をカテゴリ分けします。
 * @author Tamaki Awana
 * @help ショップ購入時の商品をカテゴリ分けします。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.0.5   開発版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ItemName
 * @desc アイテムの名称です。空欄の場合、システム標準の用語を使用します。
 * @default アイテム
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
 * @desc アクセサリの名称です。
 * @default アクセサリ
 * @parent ItemNames
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ショップ購入時の商品をカテゴリ分けします。
 * @author 沫那環
 * @help ショップ購入時の商品をカテゴリ分けします。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.0.5   開発版公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ItemName
 * @desc アイテムの名称です。空欄の場合、システム標準の用語を使用します。
 * @default アイテム
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
 * @desc アクセサリの名称です。
 * @default アクセサリ
 * @parent ItemNames
 * 
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  const name_item = String(parameters["ItemName"]);
  const name_wpn = String(parameters["WeaponName"]);
  const name_sld = String(parameters["SieldName"]);
  const name_hlm = String(parameters["HelmetName"]);
  const name_armr = String(parameters["ArmorName"]);
  const name_accs = String(parameters["AccessoryName"]);

  //Window_ShopCategory
  function Window_ItemCategory_Shop() {
    this.initialize.apply(this, arguments);
  }

  Window_ItemCategory_Shop.prototype = Object.create(
    Window_ItemCategory.prototype
  );
Window_ItemCategory_Shop.prototype.constructor = Window_ItemCategory_Shop;

  Window_ItemCategory_Shop.prototype.maxCols = function () {
    return 6;
  };

  Window_ItemCategory_Shop.prototype.makeCommandList = function () {
    let itemname = "";
    let wpnname = "";
    let sldname = "";
    let hlmname = "";
    let armname = "";
    let accsname = "";
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
    this.addCommand(item, 'item');
    this.addCommand(wpn, 'weapon');
    this.addCommand(sld, 'shield');
    this.addCommand(hlm, 'helmet');
    this.addCommand(armr, 'armor');
    this.addCommand(accs, 'accessory');
  };

  //Window_ShopBuy
  Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods) {
    var width = this.windowWidth();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._shopCategory = "";
    this._shopGoods = shopGoods;
    this._money = 0;
    this.refresh();
    this.select(0);
  };

  Window_ShopBuy.prototype.setCategory = function(category) {
    this._category = category;
    this.refresh();
  };

  Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]];
            break;
        case 1:
            item = $dataWeapons[goods[1]];
            break;
        case 2:
        if (category == "shield") {
            if ($dataArmors[goods[1]].etypeId == 1) {
            item = $dataArmors[goods[1]];
            }
            break;
        } else if (category == "helmet") {
            if ($dataArmors[goods[1]].etypeId == 2) {
            item = $dataArmors[goods[1]];
            }
            break;
        } else if (category == "armor") {
            if ($dataArmors[goods[1]].etypeId == 3) {
            item = $dataArmors[goods[1]];
            }
            break;
        } else if (category == "accesory") {
            if ($dataArmors[goods[1]].etypeId == 4) {
            item = $dataArmors[goods[1]];
            }
            break;
        }
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }, this);
  };

  //Window_ShopSell
  Window_ShopSell.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._shopCategory = "";
  };

  Window_ShopSell.prototype.setCategory = function(category) {
    this._category = category;
    this.refresh();
  };

  Window_ShopSell.prototype.makeItemList = function() {
    this._list.forEach(function(category) {
        var item = null;
        switch (list[0]) {
        case 0:
            this._list.push.$dataItems[list[1]];
            break;
        case 1:
            this._list.push.$dataWeapons[list[1]];
            break;
        case 2:
          if (category == "shield") {
            if ($dataArmors[list[1]]. item.etypeId == 1) {
              this._list.push.$dataArmors[list[1]];
            }
            break;
        } else if (category == "helmet") {
            if ($dataArmors[list[1]]. item.etypeId == 2) {
              this._list.push.$dataArmors[list[1]];
            }
            break;
        } else if (category == "armor") {
            if ($dataArmors[list[1]]. item.etypeId == 3) {
              this._list.push.$dataArmors[list[1]];
            }
            break;
        } else if (category == "accesory") {
            if ($dataArmors[list[1]]. item.etypeId == 4) {
              this._list.push.$dataArmors[list[1]];
            }
            break;
        }
    }, this);
  };

  //Scene_Shop
  Scene_Shop.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_ItemCategory_Shop(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
  };

Scene_Shop.prototype.activateBuyWindow = function() {
    this._buyWindow.setMoney(this.money());
    this._categoryWindow.show();
    this._categoryWindow.select(0);
    this._buyWindow.show();
    this._buyWindow.activate();
    this._statusWindow.show();
};
})();