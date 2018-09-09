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
        _passWordArr: [],
    },

    // use this for initialization
    onLoad: function () {
        this.lblPass.node.active = false;

        console.log("main scene onload");
        this.node.on("match_word", function (event) {
            let word = event.detail.word;

            if(this._wordArr.length > 0)
            {
                this._wordArr.forEach(function (__word) {
                    if(word == __word)
                    {
                        if(this.checkAllWordsPassed())
                        {
                            this.lblPass.node.active = true;
                            return;
                        }

                        if(this._passWordArr.length > 0)
                        {
                            for(let i = 0; i < this._passWordArr.length; ++i)
                            {
                                if(this._passWordArr[i] != word)
                                {
                                    this.showPassedWord(word);
                                }
                            }
                        }
                        else
                        {
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

    reload: function () {
        if(typeof this._words === "string")
        {
            this._wordArr = this._words.split(',');
            let letterArr = [];
            this._wordArr.forEach(function (word) {
                for(let i = 0; i < word.length; ++i)
                {
                    letterArr.push(word[i]);
                }
            });

            letterArr = this.uniq(letterArr);

            let touchNodePrefab = null;
            let touchNodeName = "";
            switch(letterArr.length)
            {
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

            if(touchNodePrefab && touchNodeName != "")
            {
                let touchNode = cc.instantiate(touchNodePrefab);
                if(touchNode)
                {
                    this.touchNode.addChild(touchNode);
                    let touchNodeView = touchNode.getComponent(touchNodeName);
                    if(touchNodeView)
                    {
                        touchNodeView.setLetters(letterArr);
                    }
                }
            }

        }
    },

    showPassedWord: function (word) {
        let wordNode = cc.instantiate(this.wordPrefab);
        if(wordNode)
        {
            this.content.addChild(wordNode);
            let wordView = wordNode.getComponent("wordView");
            if(wordView)
            {
                wordView.setWord(word);
                this._passWordArr.push(word);
            }
        }
    },

    checkAllWordsPassed: function () {
        return this._passWordArr.length >= this._wordArr.length;
    },

    uniq: function (array){
        let  temp = {}, r = [], len = array.length, val, type;
        for (let i = 0; i < len; i++) {
            val = array[i];
            type = typeof val;
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

    setWords: function (__words) {
        this._words = __words;
        this.reload();
    },

    // called every frame
    update: function (dt) {

    },

    onButtonTapped: function () {
        console.log("tttttt");
    },
});
