(function($) {

    var COLUMN_COUNT = 5;

    function WaterFallCols(container) {
        this._jqContainer = $(container);
        this._columnBaseLines = [0, 0, 0, 0, 0];
        this._fixedWidth = parseInt((container.width() + 20) / COLUMN_COUNT) - 20;

        this._count = 0;

        this.attachChild(30);
        this._refreshing = false;
    }

    WaterFallCols.prototype.attachChild = function(count) {
        if(this._refreshing || this._count > 100) {return;}
        this._refreshing = true;
        var that = this;
        var domArr = getDom(count);

        $.each(domArr, function(key, ele) {
            var pos = that._getNextBlockPosition();
            ele.css({
                left: pos.left,
                top: pos.top
            })
            .outerWidth(that._fixedWidth)
            .text(++that._count);

            var lowestBaseLine = parseInt(pos.top + ele.height());
            that._columnBaseLines[pos.idx] = parseInt(ele.css('top')) + ele.height();
            that._jqContainer.height(lowestBaseLine + 25);
            that._jqContainer.append(ele);
        });

        window.setInterval(function() {
            that._refreshing = false;
        }, 4000);
    }

    WaterFallCols.prototype._getNextBlockPosition = function() {
        var lowestIdx = 0;
        for(var i=1; i<COLUMN_COUNT; i++) {
            if(this._columnBaseLines[i] < this._columnBaseLines[lowestIdx]) {
                lowestIdx = i;
            }
        }

        return {
            idx: lowestIdx,
            left: (this._fixedWidth + 20) * lowestIdx,
            top: this._columnBaseLines[lowestIdx] + 20
        };
    }

    function getDom(count) {
        var domArr = [];
        for(var i=0; i<count; i++) {
            var rHeight = parseInt(Math.random() * 200 + 300);
            var dom = $('<div />')
                .height(rHeight)
                .css('backgroundColor', getRGBA());
            domArr.push(dom);
        }
        return domArr;
    }

    function getRGBA() {
        var r = parseInt(Math.random() * 255);
        var g = parseInt(Math.random() * 255);
        var b = parseInt(Math.random() * 255);

        return 'rgba(' + r + ',' + g + ',' + b + ', 0.2)'
    }

    function waterFall() {
        return new WaterFallCols($(this));
    }

    $.fn.waterFall = waterFall;

    return $;
})(jQuery)