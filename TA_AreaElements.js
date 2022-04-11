//=============================================================================
// TA_AreaElements.js
//=============================================================================
/*:
 * @plugindesc Implement area elements system.
 * @author Tamaki Awana
 * @help By accumulating on the spot during battle,
 *  we will implement the "Area elements system" that can be used as
 *  an element to change the cost of the skill
 *  and the effect rates of the corresponding attack element.
 * Also, by executing the plugin command,
 *  we will implement the "Stable area elements system"
 *  that allows you to set area elements
 *  that can be used unlimitedly as skill costs during battle.
 *
 * 
 * About Versus Element:
 *  When the area element is added, if you attack with a skill
 *  that has the element set in advance as the corresponding versus element,
 *  the effect of lowering the element rates will be applied.
 *  Also, if you add a note tag <AE_VersusRemove> to the note of
 *  the skill or item, it will be offset and disappear
 *  when you add the area element of the versus element.
 * 
 * 
 * About Note Tag:
 *  You can enter the these note tag in the
 *  note of actor / class / equipment / skill / item / state.
 * ･<AE_Add:[element id]>
 *  When the effect of a skill or item is applied,
 *  area elements of the set element number are added.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Add: 2,3,3>.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Remove:[element id]>
 *  When the effect of a skill or item is applied,
 *  area elements of the set element number are removed.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Remove:2,3,3>.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_FullRemove>
 *  When the effect of a skill or item is applied,
 *  delete all currently accumulated area elements.
 *  The number of accumulated area elements will be added to
 *  the element rates of the attack element.
 * 
 * ･<AE_VersusRemove>
 *  When this note tag is in the note,
 *  it activates the area elements offset effect
 *  by the area elements of the versus elements.
 * 
 * ･<AE_DontAdjust>
 *  When this note tag is in the note,
 *  the operation to add or delete area elements specified
 *  in the equipment, state, actor, and class will not be performed.
 *  By setting this tag, you can create states and skills
 *  that do not cause additional area element fluctuations.
 * 
 *
 * You can enter the these note tag in the note of skill / item.
 * ･<AE_Cost:[element id]>
 *  The condition for use is that there are area elements
 *  with the specified element number.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Cost:2,3,3>.
 *  The specified area elements will be erased
 *  when the effect of the skill or item is applied.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Need:[element id]>
 *  The condition for use is that there are area elements
 *  with the specified element number.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Need:2,3,3>.
 *  Unlike the AE_Cost tag, even if you use a skill or item,
 *  the specified area elements in the tag will remain.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Need_Nil>
 *  The condition for using skills and items is that there are no area elements.
 * 
 *
 * Plugin Commands:
 *  StableAreaElement add [element id]
 *  Adds the element with the specified number to the stable area element.
 *  If you try to add more stable area elements than you have set,
 *  the oldest ones will be deleted.
 *  Stable area elements will remain on the map
 *  until they are removed with the "StableAreaElement remove" or 
 *  "StableAreaElement clear" command.
 *
 *  StableAreaElement remove [element id]
 *  Removes the element with the specified number from the stable area element.
 *
 *  StableAreaElement clear
 *  Delete all currently installed stable area elements.
 *
 *  AreaElement add [element id]
 *  Adds the element with the specified number to the area element.
 * 
 *  AreaElement vs_add [element id]
 *  Adds the element with the specified number to the area element.
 *  This command, if there are area element of versus element,
 *  the offset effect will be activated.
 *
 *  AreaElement remove [element id]
 *  Removes the element with the specified number from the area element.
 *
 *  AreaElement clear
 *  Delete all currently installed area elements.
 * 
 * 
 * Caution:
 * ･Since the processing related to element rate / skill and item
 *  usage conditions has been modified, there is a possibility of conflict
 *  with other plugins that modify the same part.
 * ･After using the skill or item,
 *  the area element are added / deleted by the tags described
 *  in the actor / class / equipment / state.
 * 
 * 
 * Update History:
 * ver.1.1 Fixed a bug in the plugin command "AreaElement".
 *         Added a function to adjust the display position of the icon.
 *         Changed the default value of window related parameters.
 * ver.1.0.1 Fixed a typo in the English help.
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * This plugin is based on ちいさな本屋's RGSS2 material
 *  "XRXSv52. 属性活性エネルギー".
 * Thanks to ちいさな本屋 (http://xrxs.at-ninja.jp/).
 *
 *
 * @param AreaElements
 * @desc Set the element to be used as the area elements.
 * @type struct<AreaElementList>[]
 * @default ["{\"ElementId\":\"2\",\"ElementIconId\":\"64\",\"VSElementId\":\"3\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\",\"VSElementId\":\"2\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\",\"VSElementId\":\"0\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\",\"VSElementId\":\"0\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\",\"VSElementId\":\"7\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\",\"VSElementId\":\"6\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\",\"VSElementId\":\"9\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\",\"VSElementId\":\"8\"}"]
 *
 * @param AERate
 * @type number
 * @min -9007
 * @max 9007
 * @desc It is the change of the element rate per a area element.(unit:%) If set to 0, the element rate does not change.
 * @default 10
 * 
 * @param AEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the X-axis direction when arranging the icons of the area element.
 * @default 36
 *
 * @param AEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the Y-axis direction when arranging the icons of the area element.
 * @default 0
 *
 * @param AEWShowSelectList
 * @type boolean
 * @on Show
 * @off Don't show
 * @desc Which setting to display the area element window when selecting a skill item.
 * @default false
 * 
 * @param AEWShowBattleMes
 * @type boolean
 * @on Show
 * @off Don't show
 * @desc Which setting to display the area element window when battle message is displayed.
 * @default false
 * 
 * @param AreaElementSetting
 * @desc Setting of area element.
 * 
 * @param AENumber
 * @type number
 * @min 1
 * @max 9007
 * @default 8
 * @desc The number of area elements to accumulate.
 * Default: 8
 * @parent AreaElementSetting
 *
 * @param AEMax
 * @type select
 * @option Do not accumulate new area elements.
 * @value dontaccumulate
 * @option Erase from the oldest.
 * @value erase
 * @default erase
 * @desc Set how to handle newly added area elements when the area elements are full.
 * @parent AreaElementSetting
 *
 * @param AEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of area element window.
 * @default 316
 * @parent AreaElementSetting
 *
 * @param AEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of area element window.
 * @default 68
 * @parent AreaElementSetting
 *
 * @param AEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of area element window.
 * @default 500
 * @parent AreaElementSetting
 *
 * @param AEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of area element window.
 * @default 376
 * @parent AreaElementSetting
 *
 * @param AEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of area element window.
 * @default 255
 * @parent AreaElementSetting
 *
 * @param AEWindowBG
 * @desc Background image of area element window. Please put the background image in the img/system.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent AreaElementSetting
 * 
 * @param AEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of display start position of area element icon.
 * @default 0
 * @parent AreaElementSetting
 *
 * @param AEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of display start position of area element icon.
 * @default 0
 * @parent AreaElementSetting
 *
 * @param StableAreaElementSetting
 * @desc Setting of stable area element.
 * 
 * @param StableAENumber
 * @type number
 * @min 0
 * @max 9007
 * @default 2
 * @desc The number of stable area element. If set to 0, it will not be used. Default: 2　
 * @parent StableAreaElementSetting
 *
 * @param SAEShowing
 * @type select
 * @option Show in a dedicated window.
 * @value standalone
 * @option Display before area elements in the area element window.
 * @value beforeae
 * @option Display after area elements in the area element window.
 * @value afterae
 * @default standalone
 * @desc Sets how stable area elements are displayed.
 * @parent StableAreaElementSetting
 * 
 * @param SAEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the X-axis direction when displaying stable area elements and area elements in one window.
 * @default 16
 * @parent SAEShowing
 *
 * @param SAEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the Y-axis direction when displaying stable area elements and area elements in one window.
 * @default 0
 * @parent SAEShowing
 * 
 * @param SAEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of stable area element window.
 * @default 104
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of stable area element window.
 * @default 68
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of stable area element window.
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of stable area element window.
 * @default 376
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of stable area element window.
 * @default 255
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowBG
 * @desc Background image of stable area element window. Please put the background image in the img/system.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent StableAreaElementSetting
 * 
 * @param SAEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of display start position of stable area element icon.
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of display start position of stable area element icon.
 * @default 0
 * @parent StableAreaElementSetting
 */
/*~struct~AreaElementList:
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc The ID of the element used as the area element.
 * @default 1
 *
 * @param ElementIconId
 * @desc The icon of the element used as the area element.
 * @default 0
 * 
 * @param VSElementId
 * @type number
 * @min 0
 * @max 9007
 * @desc The ID of the versus element. If set to 0, the versus element will be disabled.
 * @default 0
 */
/*:ja
 * @plugindesc 空間属性システムを実装します。
 * @author 沫那環
 * @help 戦闘時にその場にためることで、スキルのコストや、
 * 対応する攻撃属性の有効度を変動させる要素として使える
 * 空間属性のシステムを実装します。
 * また、プラグインコマンドを実行することにより、戦闘時のスキルコストとして
 * 無制限に利用可能な空間属性を設置できる、固定空間属性システムを実装します。
 *
 * 
 * 【対立属性について】
 * 　空間属性が追加されている時に、対応する対立属性としてあらかじめ設定しておいた
 * 　属性を持ったスキルなどで攻撃すると、属性有効度を下げる効果が発動します。
 * 　また、スキルやアイテムのメモ欄に<AE_VersusRemove>というメモタグを追加すると、
 * 　対立属性の空間属性を追加した際に、相殺されて消える効果が発揮されます。
 * 
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラス・装備・スキル・アイテム・ステートのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<AE_Add:属性番号>
 *  スキルおよびアイテムの効果の発動時に、設定した属性番号の空間属性を追加します。
 * 　<AE_Add:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Remove:属性番号>
 * 　スキルおよびアイテムの効果の発動時に、設定した属性番号の空間属性を削除します。
 * 　<AE_Remove:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_FullRemove>
 * 　スキルおよびアイテムの効果の発動時に、現在たまっている
 * 　空間属性を全て削除します。
 * 　空間属性がたまっている個数分、攻撃属性の属性有効度への加算が発生します。
 * 
 * ・<AE_VersusRemove>
 * 　このメモタグがメモ内にある場合、対立属性の空間属性による、
 * 　空間属性の相殺効果を発動させます。
 * 
 * ・<AE_DontAdjust>
 * 　このメモタグがメモ内にある場合、装備・ステート・アクター・クラスで
 * 　指定された、空間属性の追加や削除を行いません。
 * 　このタグを設定することで、追加の空間属性の変動が発生しないステートやスキルを
 * 　作ることができます。
 * 　
 *
 * スキル・アイテムのメモ欄に、以下のメモタグが記載できます。
 * ・<AE_Cost:属性番号>
 * 　指定した属性番号の空間属性があることを使用条件にします。
 * 　<AE_Cost:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　指定した空間属性は、スキルやアイテムの効果の発動時に消去されます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Need:属性番号>
 * 　指定した属性番号の空間属性があることを使用条件にします。
 * 　<AE_Need:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　AE_Costタグと違い、スキルやアイテムを使用しても、タグで指定した属性は残ります。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Need_Nil>
 * 　空間属性が一個もない状態を、スキルやアイテムの使用条件とします。
 * 
 *
 * 【プラグインコマンド】
 * 　StableAreaElement add 属性番号
 * 　固定空間属性に指定した番号の属性を追加します。
 * 　設定した個数以上の空間属性を設置しようとすると、古いものから
 * 　削除されていきます。
 * 　固定空間属性は、「StableAreaElement remove」コマンド、
 * 　または「StableAreaElement clear」で削除するまで、
 * 　マップ移動をしても残り続けます。
 *
 * 　StableAreaElement remove 属性番号
 * 　指定した番号の固定空間属性属性を取り除きます。
 *
 * 　StableAreaElement clear
 * 　現在設置されている固定空間属性を全て削除します。
 *
 * 　AreaElement add 属性番号
 * 　空間属性に指定した番号の属性を追加します。
 * 
 * 　AreaElement vs_add 属性番号
 * 　空間属性に指定した番号の属性を追加します。
 * 　こちらのコマンドでは、対立する空間属性がある場合、相殺効果が発動します。
 *
 * 　AreaElement remove 属性番号
 * 　空間属性から指定した番号の属性を取り除きます。
 *
 * 　AreaElement clear
 * 　現在存在している空間属性を全て削除します。
 * 
 * 
 * 【注意】
 * 　・属性有効度・スキルやアイテムの使用条件に関する処理の改変を行っているため、
 * 　　同じような部分の機能を改造する他のプラグインと、競合する可能性があります。
 * 　・スキルまたはアイテムの使用後に、アクター・クラス・装備・ステートに
 * 　　記載されたタグによる空間属性の追加・削除の処理が行われます。
 * 
 * 
 * 【更新履歴】
 * 　ver.1.1   プラグインコマンド「AreaElement」のバグを修正。
 *             アイコンの表示位置を調整できる機能を追加。
 *             ウィンドウ関係のパラメーターのデフォルト値を変更。
 * 　ver.1.0.1 英語版ヘルプの誤字を修正。
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * このプラグインを制作するにあたり、
 * 「ちいさな本屋」（http://xrxs.at-ninja.jp/）のRGSS2スクリプト素材
 * 「XRXSv52. 属性活性エネルギー」を参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 *
 *
 * @param AreaElements
 * @desc 空間属性として使用する属性を設定します。
 * @type struct<AreaElementList>[]
 * @default ["{\"ElementId\":\"2\",\"ElementIconId\":\"64\",\"VSElementId\":\"3\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\",\"VSElementId\":\"2\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\",\"VSElementId\":\"0\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\",\"VSElementId\":\"0\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\",\"VSElementId\":\"7\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\",\"VSElementId\":\"6\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\",\"VSElementId\":\"9\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\",\"VSElementId\":\"8\"}"]
 *
 * @param AERate
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性一つあたりの属性有効率の変化です（単位：%）
 * 0を設定すると、属性有効度は変化しません。
 * @default 10
 * 
 * @param AEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性のアイコンを並べるときのX軸方向の間隔です。
 * @default 36
 *
 * @param AEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性のアイコンを並べるときのY軸方向の間隔です。
 * @default 0
 *
 * @param AEWShowSelectList
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @desc スキル・アイテム選択時に、空間属性ウィンドウを表示するかどうかの設定です。
 * @default false
 * 
 * @param AEWShowBattleMes
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @desc 戦闘メッセージが表示されている時に、空間属性ウィンドウを表示するかどうかの設定です。
 * @default false
 * 
 * @param AreaElementSetting
 * @desc 空間属性についてのパラメーター設定です。
 * 
 * @param AENumber
 * @type number
 * @min 1
 * @max 9007
 * @default 8
 * @desc ためておく空間属性の数です。
 * 初期値：8
 * @parent AreaElementSetting
 *
 * @param AEMax
 * @type select
 * @option 新しい空間属性を貯めない
 * @value dontaccumulate
 * @option 古いものから消す
 * @value erase
 * @default erase
 * @desc 空間属性が満タンになったとき、新しく追加された空間属性をどのように扱うかを設定します。
 * @parent AreaElementSetting
 *
 * @param AEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 空間属性を表示するウィンドウの幅です。
 * @default 320
 * @parent AreaElementSetting
 *
 * @param AEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 空間属性を表示するウィンドウの高さです。
 * @default 68
 * @parent AreaElementSetting
 *
 * @param AEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性を表示するウィンドウのX座標です。
 * @default 492
 * @parent AreaElementSetting
 *
 * @param AEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性を表示するウィンドウのY座標です。
 * @default 376
 * @parent AreaElementSetting
 *
 * @param AEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 空間属性を表示するウィンドウの透明度です。
 * @default 255
 * @parent AreaElementSetting
 *
 * @param AEWindowBG
 * @desc 空間属性を表示するウィンドウの背景画像です。
 * 背景画像はimg/system内においてください。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent AreaElementSetting
 * 
 * @param AEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性アイコンの表示開始位置のX座標です。
 * @default 0
 * @parent AreaElementSetting
 *
 * @param AEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性アイコンの表示開始位置のY座標です。
 * @default 0
 * @parent AreaElementSetting
 *
 * @param StableAreaElementSetting
 * @desc 空間属性についてのパラメーター設定です。
 * 
 * @param StableAENumber
 * @type number
 * @min 0
 * @max 9007
 * @default 2
 * @desc 固定空間属性の数です。0を設定すると使用しません。
 * 初期値：2
 * @parent StableAreaElementSetting
 *
 * @param SAEShowing
 * @type select
 * @option 専用のウィンドウに表示する
 * @value standalone
 * @option 空間属性ウィンドウで、空間属性の前に表示する
 * @value beforeae
 * @option 空間属性ウィンドウで、空間属性の後に表示する
 * @value aftereae
 * @default standalone
 * @desc 固定空間属性の表示方法を設定します。
 * @parent StableAreaElementSetting
 * 
 * @param SAEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性と空間属性を一つのウィンドウで表示するときの、X軸方向の間隔です。
 * @default 16
 * @parent SAEShowing
 *
 * @param SAEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性と空間属性を一つのウィンドウで表示するときの、Y軸方向の間隔です。
 * @default 0
 * @parent SAEShowing
 * 
 * @param SAEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウの幅です。
 * @default 108
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウの高さです。
 * @default 68
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウのX座標です。
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウのY座標です。
 * @default 376
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 固定空間属性を表示するウィンドウの透明度です。
 * @default 255
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowBG
 * @desc 固定空間属性を表示するウィンドウの背景画像です。
 * 背景画像はimg/system内においてください。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent StableAreaElementSetting
 * 
 * @param SAEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性アイコンの表示開始位置のX座標です。
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性アイコンの表示開始位置のY座標です。
 * @default 0
 * @parent StableAreaElementSetting
 */
/*~struct~AreaElementList:ja
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc 空間属性として使用する属性のIDです。
 * @default 1
 *
 * @param ElementIconId
 * @desc 空間属性として使用する属性のアイコンです。
 * @default 0
 * 
 * @param VSElementId
 * @type number
 * @min 0
 * @max 9007
 * @desc 対立する属性のIDです。0を設定すると、対立属性は無効となります。
 * @default 0
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

  var aebase = parameters["AreaElements"];
  var aesetting = StructConvert(aebase);
  var aenum = Number(parameters["AENumber"] || 8);
  var aemax = String(parameters["AEMax"] || "erase");
  var staenum = Number(parameters["StableAENumber"] || 2);
  var aerate = Number(parameters["AERate"] || 0.1);

  var aewwidth = Number(parameters["AEWindowWidth"] || 320);
  var aewheight = Number(parameters["AEWindowHeight"] || 68);
  var aewx = Number(parameters["AEWindowX"] || 500);
  var aewy = Number(parameters["AEWindowY"] || 376);
  var aeqop = Number(parameters["AEWindowOp"] || 255);
  var aewbg = String(parameters["AEWindowBG"]);

  var staewwidth = Number(parameters["SAEWindowWidth"] || 104);
  var staewheight = Number(parameters["SAEWindowHeight"] || 68);
  var staewx = Number(parameters["SAEWindowX"] || 0);
  var staewy = Number(parameters["SAEWindowY"] || 376);
  var staeqop = Number(parameters["SAEWindowOp"] || 255);
  var staewbg = String(parameters["SAEWindowBG"]);

  var saedp = String(parameters["SAEShowing"] || "standalone");
  var staestx = Number(parameters["SAEStartX"] || 0);
  var staesty = Number(parameters["SAEStartY"] || 0);
  var staedistx = Number(parameters["SAEDistanceX"] || 16);
  var staedisty = Number(parameters["SAEDistanceY"] || 0);

  var aestx = Number(parameters["AEStartX"] || 0);
  var aesty = Number(parameters["AEStartY"] || 0);
  var aedistx = Number(parameters["AEDistanceX"] || 36);
  var aedisty = Number(parameters["AEDistanceY"] || 0);
  var aewssel = String(parameters["AEWShowSelectList"] || "false");
  var aewsbm = String(parameters["AEWShowBattleMes"] || "false");

  //Game_Interpreter
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if ($gameParty.inBattle() || $gameTroop.inBattle()) {
      if (command === "AreaElement") {
        switch (args[0]) {
          case "add":
            var ae = Number(args[1]);
            $gameTemp.addAreaElements(ae);
            break;
          case "vs_add":
            var ae = Number(args[1]);
            var aeset = aesetting.filter(function ({ ElementId }) {
              return ElementId === ae;
            });
            if (aeset.length > 0) {
              var vsae = aeset[0].VSElementId;
            } else {
              var vsae = 0;
            }
            var vsaeindex = $gameTemp.AreaElements().indexOf(vsae);
            if (vsaeindex !== -1) {
              $gameTemp.removeAreaElements(vsaeindex);
            } else {
              $gameTemp.addAreaElements(ae);
            }
            break;
          case "remove":
            var ae = Number(args[1]);
            $gameTemp.removeAreaElements(ae);
            break;
          case "clear":
            $gameTemp.clearAreaElements();
            break;
        }
      }
      if (command === "StableAreaElement") {
        switch (args[0]) {
          case "add":
            var stae = Number(args[1]);
            $gameMap.addStableAreaElements(stae);
            break;
          case "remove":
            var stae = Number(args[1]);
            $gameMap.removeStableAreaElements(stae);
            break;
          case "clear":
            $gameMap.clearStableAreaElements();
            break;
        }
      }
    }
  };

  //BattleManager
  var _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    _BattleManager_initMembers.call(this);
    this._aeWindow = null;
    if (staenum > 0) {
      this._staeWindow = null;
    }
  };

  BattleManager.setAEWindow = function (aeWindow) {
    this._aeWindow = aeWindow;
  };

  BattleManager.setStableAEWindow = function (staeWindow) {
    this._staeWindow = staeWindow;
  };

  //Game_Temp
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this._AreaElements = new Array();
  };

  Game_Temp.prototype.AreaElements = function () {
    return this._AreaElements;
  };

  Game_Temp.prototype.addAreaElements = function (elementid) {
    if (aemax == "erase") {
      this._AreaElements.push(elementid)
      while (this.AreaElements().length > aenum) {
        this._AreaElements.shift();
        if (this.AreaElements().length <= aenum) {
          break;
        }
      }
    } else {
      if (this.AreaElements().length < aenum) {
        this._AreaElements.push(elementid);
      }
    }
  };

  Game_Temp.prototype.removeAreaElements = function (elementid) {
    var index = this.AreaElements().indexOf(elementid);
    if (index !== -1) {
      this._AreaElements.splice(index, 1);
    }
  };

  Game_Temp.prototype.clearAreaElements = function () {
    this._AreaElements.splice(0);
  };

  //Game_Map
  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    _Game_Map_initialize.call(this);
    this._StableAreaElements = new Array();
  };

  Game_Map.prototype.StableAreaElements = function () {
    return this._StableAreaElements;
  };

  Game_Map.prototype.addStableAreaElements = function (elementid) {
    this._StableAreaElements.push(elementid)
    while (this.StableAreaElements().length > staenum) {
      this._StableAreaElements.shift();
      if (this.StableAreaElements().length <= staenum) {
        break;
      }
    }
  };

  Game_Map.prototype.removeStableAreaElements = function (elementid) {
    var index = this.StableAreaElements().indexOf(elementid);
    if (index !== -1) {
      this._StableAreaElements.splice(index, 1);
    }
  };

  Game_Map.prototype.clearStableAreaElements = function () {
    this._StableAreaElements.splice(0);
  };

  //Game_BattlerBase
  var _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
  Game_BattlerBase.prototype.meetsSkillConditions = function (skill) {
    var basemskc = _Game_BattlerBase_meetsSkillConditions.call(this, skill);
    return this.canPaySkillCostAE(skill) && basemskc;
  };

  Game_BattlerBase.prototype.allAE = function () {
    var ae = $gameTemp.AreaElements();
    if (staenum > 0) {
      var sae = $gameMap.StableAreaElements();
      return ae.concat(sae);
    } else {
      return ae;
    }
  };

  Game_BattlerBase.prototype.getVSAE = function (elementid) {
    var ae = aesetting.filter(function ({ ElementId }) {
      return ElementId === elementid;
    });
    if (ae.length > 0) {
      var vsae = ae[0].VSElementId;
    } else {
      var vsae = 0;
    }
    return vsae;
  }

  Game_BattlerBase.prototype.canPaySkillCostAE = function (skill) {
    var aeneed = this.AENeed(skill);
    var aecost = this.AECost(skill);
    var allae = this.allAE();
    if (skill.meta.AE_Need_Nil) {
      if (allae.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    if (aeneed.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        var allaest = allae.concat().sort(function(a, b) {return a - b;});
        var aeneedst = aeneed.concat().sort(function(a, b) {return a - b;});
        var aeset = allaest.filter(i => aeneedst.indexOf(i) != -1).sort();
        for (var i = 0, n = aeneedst.length; i < n; ++i) {
          if (aeneedst[i] !== aeset[i]) return false;
        }
        return true;
      }
    }
    if (aecost.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        var allaest = allae.concat().sort(function(a, b) {return a - b;});
        var aecostst = aecost.concat().sort(function(a, b) {return a - b;});
        var aeset = allaest.filter(i => aecostst.indexOf(i) != -1).sort();
        for (var i = 0, n = aecostst.length; i < n; ++i) {
          if (aecostst[i] !== aeset[i]) return false;
        }
        return true;
      }
    }
    return true;
  };

  var _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
	Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _Game_BattlerBase_paySkillCost.call(this, skill);
    this.removeSkillAECost(skill);
  };

  Game_BattlerBase.prototype.removeSkillAECost = function(skill) {
    var aecost = this.AECost(skill);
    if (aecost.length > 0) {
      for (var i = 0; i < aecost.length; i++) {
        $gameTemp.removeAreaElements(aecost[i]);
      }
    }
  };

  var _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
  Game_BattlerBase.prototype.meetsItemConditions = function (item) {
    var basemimc = _Game_BattlerBase_meetsItemConditions.call(this, item);
    return basemimc && this.canPayItemCostAE(item);
  };

  Game_BattlerBase.prototype.processitemAE = function(item) {
    if (item.meta.AE_FullRemove) {
      $gameTemp.clearAreaElements();
    }
    var aerem = this.AERemove(item);
    if (aerem.length > 0) {
      for (var i = 0; i < aerem.length; i++) {
        $gameTemp.removeAreaElements(aerem[i]);
      }
    }
    var addae = this.AEAdd(item);
    if (addae.length > 0) {
      if (item.meta.AE_VersusRemove) {
        var vsae = new Array();
        for (var i = 0; i < addae.length; i++) {
          vsae.push(this.getVSAE(addae[i]));
        }
        for (var i = 0; i < vsae.length; i++) {
          var vsaeindex = $gameTemp.AreaElements().indexOf(vsae[i]);
          if (vsaeindex !== -1) {
            $gameTemp.removeAreaElements(vsaeindex);
          } else {
            $gameTemp.addAreaElements(addae[i]);
          }
        }
      } else {
        for (var i = 0; i < addae.length; i++) {
          $gameTemp.addAreaElements(addae[i]);
        }
      }
    }
  };

  Game_BattlerBase.prototype.canPayItemCostAE = function (item) {
    var aeneed = this.AENeed(item);
    var aecost = this.AECost(item);
    var allae = this.allAE();
    if (item.meta.AE_Need_Nil) {
      if (allae.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    if (aeneed.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        var allaest = allae.concat().sort(function(a, b) {return a - b;});
        var aeneedst = aeneed.concat().sort(function(a, b) {return a - b;});
        var aeset = allaest.filter(i => aeneedst.indexOf(i) != -1).sort();
        for (var i = 0, n = aeneedst.length; i < n; ++i) {
          if (aeneedst[i] !== aeset[i]) return false;
        }
        return true;
      }
    }
    if (aecost.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        var allaest = allae.concat().sort(function(a, b) {return a - b;});
        var aecostst = aecost.concat().sort(function(a, b) {return a - b;});
        var aeset = allaest.filter(i => aecostst.indexOf(i) != -1).sort();
        for (var i = 0, n = aecostst.length; i < n; ++i) {
          if (aecostst[i] !== aeset[i]) return false;
        }
        return true;
      }
    }
    return true;
  };

  Game_BattlerBase.prototype.AreaElementRate = function (elementId) {
    var aecounts = 0;
    var aerbase = this.allAE();
    var vsae = this.getVSAE(elementId);
    if (aerbase.length > 0) {
      for (var i = 0; i < aerbase.length; i++) {
        if (aerbase[i] == elementId) {
          aecounts++;
        } else if (vsae > 0 && aerbase[i] == vsae) {
          aecounts--;
        }
      }
    }
    return aecounts * (aerate / 100);
  };

  Game_BattlerBase.prototype.FullAreaElementRate = function () {
    var aerb = this.allAE();
    return aerb.length * (aerate / 100);
  };

  Game_BattlerBase.prototype.AEAdd = function (item) {
    var addae = new Array();
    if (item.meta.AE_Add != null) {
      var addaebase = item.meta.AE_Add.split(',').map(Number);
      for (var i = 0; i < addaebase.length; i++) {
        var ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === addaebase[i];
        });
        var aeresult = ae[0].ElementId;
        addae.push(aeresult);
      }
    }
    return addae;
  };

  Game_BattlerBase.prototype.AERemove = function (item) {
    var remae = new Array();
    if (item.meta.AE_Remove != null) {
      var remaebase = item.meta.AE_Remove.split(',').map(Number);
      for (var i = 0; i < remaebase.length; i++) {
        var ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === remaebase[i];
        });
        var aeresult = ae[0].ElementId;
        remae.push(aeresult);
      }
    }
    return remae;
  };

  Game_BattlerBase.prototype.AENeed = function (item) {
    var needae = new Array();
    if (item.meta.AE_Need != null) {
      var needaebase = item.meta.AE_Need.split(',').map(Number);
      for (var i = 0; i < needaebase.length; i++) {
        var ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === needaebase[i];
        });
        var aeresult = ae[0].ElementId;
        needae.push(aeresult)
      }
    }
    return needae;
  };

  Game_BattlerBase.prototype.AECost = function (item) {
    var costae = new Array();
    if (item.meta.AE_Cost != null) {
      var costaebase = item.meta.AE_Cost.split(',').map(Number);
      for (var i = 0; i < costaebase.length; i++) {
        var ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === costaebase[i];
        });
        var aeresult = ae[0].ElementId;
        costae.push(aeresult)
      }
    }
    return costae;
  };

  //Game_Battler
  var _Game_Battler_useItem = Game_Battler.prototype.useItem;
  Game_Battler.prototype.useItem = function(item) {
    _Game_Battler_useItem.call(this, item);
    this.processitemAE(item);
  };

  var _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
  Game_Battler.prototype.consumeItem = function(item) {
    _Game_Battler_consumeItem.call(this, item);
    this.removeItemAECost(item);
  };
  
  Game_Battler.prototype.removeItemAECost = function(item) {
    var aecost = this.AECost(item);
    if (aecost.length > 0) {
      for (var i = 0; i < aecost.length; i++) {
        $gameTemp.removeAreaElements(aecost[i]);
      }
    }
  };

  Game_Battler.prototype.traitsAEChange = function() {
    var btobj = this.traitObjects();
    for (var i = 0; i < btobj.length; i++) {
      if (btobj[i].meta.AE_FullRemove) {
        $gameTemp.clearAreaElements();
      }
    }
    for (var i = 0; i < btobj.length; i++) {
      var addae = this.AEAdd(btobj[i]);
      if (btobj[i].meta.AE_VersusRemove) {
        var vsae = new Array();
        vsae.push(this.getVSAE(addae[i]));
        if (vsae.length > 0) {
          for (var j = 0; j < vsae.length; j++) {
            var vsaeindex = $gameTemp.AreaElements().indexOf(vsae[j]);
            if (vsaeindex !== -1) {
              $gameTemp.removeAreaElements(vsaeindex);
            } else {
              $gameTemp.addAreaElements(addae[j]);
            }
          }
        }
      } else {
        if (addae.length > 0) {
          for (var j = 0; j < addae.length; j++) {
            $gameTemp.addAreaElements(addae[j]);
          }
        }
      }
    }
    for (var i = 0; i < btobj.length; i++) {
      var remae = this.AERemove(btobj[i]);
      if (remae.length > 0) {
        for (var j = 0; j < remae.length; j++) {
          $gameTemp.removeAreaElements(remae[j]);
        }
      }
    }
  };

  //Game_Action
  var _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
  Game_Action.prototype.calcElementRate = function (target) {
    var baseer = _Game_Action_calcElementRate.call(this, target);
    if (this.item().meta.AE_FullRemove) {
      var aer = target.FullAreaElementRate();
    } else {
      var aer = target.AreaElementRate(this.item().damage.elementId);
    }
    return baseer + aer;
  };

  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);
    var btobj = this.subject().traitObjects();
    traeaj = true;
    for (var i = 0; i < btobj.length; i++) {
      if (btobj[i].meta.AE_DontAdjust) {
        traeaj = false;
      }
    }
    if (traeaj == true && !this.item().meta.AE_DontAdjust) {
      this.subject().traitsAEChange();
    };
  };

  //Window_AreaElements
  function Window_AreaElements() {
    this.initialize.apply(this, arguments);
  }

  Window_AreaElements.prototype = Object.create(Window_Base.prototype);
  Window_AreaElements.prototype.constructor = Window_AreaElements;

  Window_AreaElements.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_AreaElements.prototype.drawAEIcons = function (x, y) {
    var aenow = $gameTemp.AreaElements();
    for (var i = 0; i < aenow.length; i++) {
      var aesetindex = aesetting.filter(function ({ ElementId }) {
        return ElementId === aenow[i];
      });
      if (aesetindex.length > 0) {
        var aeicon = aesetindex[0].ElementIconId;
        this.drawIcon(aeicon, x + (aedistx * i), y + (aedisty * i));
      }
    }
  };

  Window_AreaElements.prototype.drawSAEIcons = function (x, y) {
    var saenow = $gameMap.StableAreaElements();
    for (var i = 0; i < saenow.length; i++) {
      var saesetindex = aesetting.filter(function ({ ElementId }) {
        return ElementId === saenow[i];
      });
      if (saesetindex.length > 0) {
        var saeicon = saesetindex[0].ElementIconId;
        this.drawIcon(saeicon, x + (aedistx * i), y + (aedisty * i));
      }
    }
  };

  Window_AreaElements.prototype.refresh = function () {
    this.contents.clear();
    if (aewbg) {
      var bitmap = ImageManager.loadSystem(aewbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    var aex = aestx;
    var aey = aesty;
    var staex = staestx;
    var staey = staesty;
    if (staenum > 0) {
      if (saedp == "beforeae") {
        aex = staedistx + (aedistx * staenum);
        aey = staedisty + (aedisty * staenum);
      } else if (saedp == "aftereae") {
        staex = staedistx + (aedistx * aenum);
        staey = staedisty + (aedisty * aenum);
      }
    }
    this.drawAEIcons(aex, aey);
    if (staenum > 0 && saedp != "standalone") {
      this.drawSAEIcons(staex, staey);
    }
  };

  //Window_StableAreaElements
  function Window_StableAreaElements() {
    this.initialize.apply(this, arguments);
  }

  Window_StableAreaElements.prototype = Object.create(Window_AreaElements.prototype);
  Window_StableAreaElements.prototype.constructor = Window_StableAreaElements;

  Window_StableAreaElements.prototype.initialize = function (x, y, width, height) {
    Window_AreaElements.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_StableAreaElements.prototype.refresh = function () {
    this.contents.clear();
    if (staewbg) {
      var bitmap = ImageManager.loadSystem(staewbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    this.drawSAEIcons(staestx, staesty);
  };

  //Scene_Battle
  var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.call(this);
    this.createAreaElementsWindow();
    if (staenum > 0 && saedp == "standalone") {
      this.createStableAreaElementsWindow();
    }
  };

  Scene_Battle.prototype.createAreaElementsWindow = function () {
    var ww = aewwidth;
    var wh = aewheight;
    var wx = aewx;
    var wy = aewy;
    this._aeWindow = new Window_AreaElements(wx, wy, ww, wh);
    this.addWindow(this._aeWindow);
    this._aeWindow.opacity = aeqop;
  };

  Scene_Battle.prototype.createStableAreaElementsWindow = function () {
    var ww = staewwidth;
    var wh = staewheight;
    var wx = staewx;
    var wy = staewy;
    this._staeWindow = new Window_StableAreaElements(wx, wy, ww, wh);
    this.addWindow(this._staeWindow);
    this._staeWindow.opacity = staeqop;
  };

  var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    _Scene_Battle_createDisplayObjects.call(this);
    BattleManager.setAEWindow(this._aeWindow);
    if (staenum > 0 && saedp == "standalone") {
      BattleManager.setStableAEWindow(this._staeWindow);
    }
  };

  var _Scene_Battle_stop = Scene_Battle.prototype.stop;
  Scene_Battle.prototype.stop = function () {
    _Scene_Battle_stop.call(this);
    this._aeWindow.hide();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.hide();
    }
  };

  var _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
  Scene_Battle.prototype.updateStatusWindow = function () {
    _Scene_Battle_updateStatusWindow.call(this);
    if ($gameMessage.isBusy()) {
      this._aeWindow.refresh();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.refresh();
      }
      if (aewsbm == "false") {
        this._aeWindow.hide();
        if (staenum > 0 && saedp == "standalone") {
          this._staeWindow.hide();
        }
      }
    } else if (this.isActive() && !this._messageWindow.isClosing()) {
      this._aeWindow.refresh();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.refresh();
      }
    }
  };

  var _Scene_Battle_refreshStatus = Scene_Battle.prototype.refreshStatus;
  Scene_Battle.prototype.refreshStatus = function() {
    _Scene_Battle_refreshStatus.call(this);
    this._aeWindow.refresh();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.refresh();
    }
  };

  var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function() {
    this._aeWindow.show();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.show();
    }
    _Scene_Battle_startPartyCommandSelection.call(this);
  };

  var _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    this._aeWindow.show();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.show();
    }
    _Scene_Battle_startActorCommandSelection.call(this);
  };

  if (aewssel == "false") {
    var _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
    Scene_Battle.prototype.commandSkill = function() {
      _Scene_Battle_commandSkill.call(this);
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
    };

    var _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function() {
      _Scene_Battle_commandItem.call(this);
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
    };

    var _Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_selectActorSelection.call(this);
    };
  
    var _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
      _Scene_Battle_onActorCancel.call(this);
    };
  
    var _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_selectEnemySelection.call(this);
    };
  
    var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
      _Scene_Battle_onEnemyCancel.call(this);
    };
  
    var _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onSkillOk.call(this);
    };
  
    var _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onSkillCancel.call(this);
    };
  
    var _Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
    Scene_Battle.prototype.onItemCancel = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onItemCancel.call(this);
    };
  }
})();
