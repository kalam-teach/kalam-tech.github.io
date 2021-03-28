function init() {
    new work();
}
var work = /** @class */ (function () {
    function work() {
        this.container = $(document).find("#container");
        this.name = this.container.find('#name');
        this.target = this.container.find('#target');
        this.renderFlames();
        this.WireEvet();
    }
    work.prototype.WireEvet = function () {
        this.container.find('#submit').on('click', $.proxy(this.Submit, this));
        this.container.find('#reset').on('click', $.proxy(this.Reset, this));
    };
    work.prototype.Reset = function (onlyRender) {
        if (onlyRender === void 0) { onlyRender = false; }
        var flames = this.container.find("#flames_container");
        if (flames.children().length < 6) {
            flames.empty();
            this.renderFlames();
        }
        if (!onlyRender) {
            this.name.val('');
            this.target.val('');
        }
    };
    work.prototype.renderFlames = function () {
        var _this = this;
        var flames = ["F", "L", "A", "M", "E", "S"];
        flames.forEach(function (letter) {
            var pTag = document.createElement("p");
            pTag.textContent = letter;
            _this.container.find("#flames_container").append(pTag);
        });
    };
    work.prototype.Submit = function () {
        var proceed = true;
        if (this.name.val() === "") {
            proceed = false;
            this.name.addClass('alert_border');
        }
        if (this.target.val() === "") {
            proceed = false;
            this.target.addClass('alert_border');
        }
        if (this.container.find("#flames_container").children().length < 6) {
            this.Reset(false);
        }
        if (proceed) {
            var flames = this.container.find("#flames_container");
            var removetag = 0;
            var totalcont = flames.children().length;
            var canchnage = false;
            var wordCount = this.WordsCount(this.name.val(), this.target.val());
            do {
                for (var count = wordCount; count > 0; count--) {
                    if (removetag === totalcont) {
                        removetag = 0;
                        if (canchnage) {
                            totalcont--;
                            canchnage = false;
                        }
                    }
                    removetag++;
                }
                this.remove(removetag);
                canchnage = true;
            } while (flames.children().length > 1);
        }
    };
    work.prototype.remove = function (child) {
        var flames = this.container.find("#flames_container");
        flames.children()[child - 1].remove();
    };
    work.prototype.WordsCount = function (first, second) {
        var name = first.replace(/ +/g, '');
        var target = second.replace(/ +/g, '');
        for (var i = 0; i < name.length; i++) {
            var index = target.indexOf(name[i]);
            if (index >= 0) {
                target = target.replace(target[index], '');
                name = name.replace(name[i], '');
                i = -1;
            }
        }
        return target.length + name.length;
    };
    return work;
}());
//# sourceMappingURL=scripts.js.map