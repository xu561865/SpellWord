(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mainScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'mainScene', __filename);
// Script/mainScene.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

cc.Class({
    extends: cc.Component,

    properties: {
        twoTouchNodesPrefab: cc.Prefab,
        threeTouchNodesPrefab: cc.Prefab,
        fourTouchNodesPrefab: cc.Prefab,
        wordPrefab: cc.Prefab,

        touchNode: cc.Node,
        content: cc.Node,
        lblPass: cc.Label,

        _words: null,
        _wordArr: [],
        _passWordArr: []
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.lblPass.node.active = false;

        console.log("main scene onload");
        this.node.on("match_word", function (event) {
            var word = event.detail.word;

            if (this._wordArr.length > 0) {
                this._wordArr.forEach(function (__word) {
                    if (word == __word) {
                        if (this.checkAllWordsPassed()) {
                            this.lblPass.node.active = true;
                            return;
                        }

                        if (this._passWordArr.length > 0) {
                            for (var i = 0; i < this._passWordArr.length; ++i) {
                                if (this._passWordArr[i] != word) {
                                    this.showPassedWord(word);
                                }
                            }
                        } else {
                            this.showPassedWord(word);
                        }
                    }
                }.bind(this));
            }
        }.bind(this));

        // test
        this.setWords("in,ok,no");
        //
    },

    reload: function reload() {
        if (typeof this._words === "string") {
            this._wordArr = this._words.split(',');
            var letterArr = [];
            this._wordArr.forEach(function (word) {
                for (var i = 0; i < word.length; ++i) {
                    letterArr.push(word[i]);
                }
            });

            letterArr = this.uniq(letterArr);

            var touchNodePrefab = null;
            var touchNodeName = "";
            switch (letterArr.length) {
                case 2:
                    touchNodePrefab = this.twoTouchNodesPrefab;
                    touchNodeName = "twoTouchNodesView";

                    break;

                case 3:
                    touchNodePrefab = this.threeTouchNodesPrefab;
                    touchNodeName = "threeTouchNodesView";

                    break;

                case 4:
                    touchNodePrefab = this.fourTouchNodesPrefab;
                    touchNodeName = "fourTouchNodesView";

                    break;

                default:
                    break;
            }

            if (touchNodePrefab && touchNodeName != "") {
                var touchNode = cc.instantiate(touchNodePrefab);
                if (touchNode) {
                    this.touchNode.addChild(touchNode);
                    var touchNodeView = touchNode.getComponent(touchNodeName);
                    if (touchNodeView) {
                        touchNodeView.setLetters(letterArr);
                    }
                }
            }
        }
    },

    showPassedWord: function showPassedWord(word) {
        var wordNode = cc.instantiate(this.wordPrefab);
        if (wordNode) {
            this.content.addChild(wordNode);
            var wordView = wordNode.getComponent("wordView");
            if (wordView) {
                wordView.setWord(word);
                this._passWordArr.push(word);
            }
        }
    },

    checkAllWordsPassed: function checkAllWordsPassed() {
        return this._passWordArr.length >= this._wordArr.length;
    },

    uniq: function uniq(array) {
        var temp = {},
            r = [],
            len = array.length,
            val = void 0,
            type = void 0;
        for (var i = 0; i < len; i++) {
            val = array[i];
            type = typeof val === "undefined" ? "undefined" : _typeof(val);
            if (!temp[val]) {
                temp[val] = [type];
                r.push(val);
            } else if (temp[val].indexOf(type) < 0) {
                temp[val].push(type);
                r.push(val);
            }
        }
        return r;
    },

    setWords: function setWords(__words) {
        this._words = __words;
        this.reload();
    },

    // called every frame
    update: function update(dt) {},

    onButtonTapped: function onButtonTapped() {
        console.log("tttttt");
    }
});

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
        //# sourceMappingURL=mainScene.js.map
        