(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Views/twoTouchNodesView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a35990NNFNI7oAdTqoIP495', 'twoTouchNodesView', __filename);
// Script/Views/twoTouchNodesView.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        labels: {
            default: [],
            type: cc.Label
        },

        touchNodes: {
            default: [],
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.touchNodes.forEach(function (touchNode) {
            touchNode.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                if (!this._lineStartNode) {
                    this._lineStartNode = touchNode;
                } else {
                    console.log("there is a touch down before");
                }
            }, this);
        });

        this.touchNodes.forEach(function (touchNode) {
            touchNode.on(cc.Node.EventType.MOUSE_UP, function (event) {
                this._lineStartNode = null;
                this._lineEndNode = null;
            }, this);
        });

        this.touchNodes.forEach(function (touchNode) {
            touchNode.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
                if (this._lineStartNode) {
                    if (this._lineStartNode != touchNode) {
                        // draw line
                    }
                }
            }, this);
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=twoTouchNodesView.js.map
        