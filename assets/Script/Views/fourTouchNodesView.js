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
            type: cc.Node,
        },

        _lineStartNode: null,
        _lineEndNode: null,
        _letters: null,
        _letterArr: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log("touch start");

            this._lineStartNode = null;
            this._lineEndNode = null;
            this._letterArr = [];

            let location = event.getLocation();
            let pos = this.node.convertToNodeSpaceAR(location);

            this.touchNodes.forEach(function (touchNode, index) {
                if(touchNode.getBoundingBox().contains(pos))
                {
                    this._lineStartNode = touchNode;
                    this._letterArr.push(this.labels[index].string);
                }
            }.bind(this));
        }, this);


        this.node.on(cc.Node.EventType.TOUCH_UP, function (event) {
            console.log("touch up");
            this._lineStartNode = null;
            this._lineEndNode = null;
            this._letterArr = [];
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log("touch move");
            if(this._lineStartNode && !this._lineEndNode)
            {
                let location = event.getLocation();
                let pos = this.node.convertToNodeSpaceAR(location);

                this.touchNodes.forEach(function (touchNode, index) {
                    if(touchNode.getBoundingBox().contains(pos))
                    {
                        if(touchNode != this._lineStartNode)
                        {
                            this._lineEndNode = touchNode;
                            this._letterArr.push(this.labels[index].string);

                            let word = this._letterArr.join('');
                            let event = new cc.Event.EventCustom('match_word', true);
                            event.detail = {word: word};
                            this.node.dispatchEvent(event);
                        }
                    }
                }.bind(this));
            }
        }, this);
    },

    start () {

    },

    setLetters (__letters) {
        this._letters = __letters;
        this.reload();
    },

    reload () {
        if((this._letters instanceof Array) && (this._letters.length >= this.labels.length))
        {
            this.labels.forEach(function (label, index) {
                label.string = this._letters[index];
            }.bind(this));
        }
    },

    // update (dt) {},
});
