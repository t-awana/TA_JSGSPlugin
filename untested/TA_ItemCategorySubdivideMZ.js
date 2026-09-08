//=============================================================================
// TA_ItemCategorySubdivideMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Subdivide the classification of items.
 * @author Tamaki Awana
 * @help Category of items on the item screen will be
 * more detailed.
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
 * @param ItemNames
 * @desc Name of each item.
 * 
 * @param ItemName
 * @desc Name of the item. If left blank, system term will be used.
 * @default Item
 * @parent ItemNames
 * 
 * @param WeaponName
 * @desc Name of the weapon. If left blank, system term will be used.
 * @default Weapon
 * @parent ItemNames
 * 
 * @param SieldName
 * @desc Name of the sield.
 * @default Sield
 * @parent ItemNames
 * 
 * @param HelmetName
 * @desc Name of the helmet.
 * @default Helmet
 * @parent ItemNames
 * 
 * @param ArmorName
 * @desc Name of the armor.  If left blank, system term will be used.
 * @default Armor
 * @parent ItemNames
 * 
 * @param AccessoryName
 * @desc Name of the accesory.
 * @default Accesory
 * @parent ItemNames
 * 
 * @param KeyItemName
 * @desc Name of the key item.  If left blank, system term will be used.
 * @default Key Item
 * @parent ItemNames
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムの分類を細分化します。
 * @author 沫那環
 * @help アイテム画面でのアイテムのカテゴリ分類を
 * より細分化します。
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
 * @param ItemNames
 * @desc 各アイテムの名称です。
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
 * @desc アクセサリの名称です。
 * @default アクセサリー
 * @parent ItemNames
 * 
 * @param KeyItemName
 * @desc 大事なものの名称です。空欄の場合、システム標準の用語を使用します。
 * @default 大事なもの
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
  const name_keyitem = String(parameters["KeyItemName"]);

  Window_ItemCategory.prototype.maxCols = function() {
    return 7;
  };

  Window_ItemCategory.prototype.makeCommandList = function() {
    let itemname = "";
    let wpnname = "";
    let sldname = "";
    let hlmname = "";
    let armname = "";
    let accsname = "";
    let keyitemname = "";
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
    this.addCommand(item, 'item');
    this.addCommand(wpn, 'weapon');
    this.addCommand(sld, 'shield');
    this.addCommand(hlm, 'helmet');
    this.addCommand(armr, 'armor');
    this.addCommand(accs, 'accessory');
    this.addCommand(keyitem, 'keyItem');
  };

  Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
        return DataManager.isWeapon(item);
    case 'sield':
        return DataManager.isArmor(item) && item.etypeId == 1;
    case 'helmet':
        return DataManager.isArmor(item) && item.etypeId == 2;
    case 'armor':
        return DataManager.isArmor(item) && item.etypeId == 3;
    case 'accesory':
        return DataManager.isArmor(item)  && item.etypeId == 4;
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
  };

  Window_ItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
  };
})();
