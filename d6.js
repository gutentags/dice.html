
module.exports = D6;
function D6(body, scope) {
    this.scope = scope;
}

D6.prototype.roll = function (ms, nextValue) {
    var self = this;
    this.value = null;
    if (nextValue == undefined) {
        nextValue = Math.floor(Math.random() * 6 + 1);
    } else {
        nextValue = nextValue;
    }
    this.nextValue = Math.max(1, Math.min(6, nextValue >>> 0));
    this.timeoutHandle = setTimeout(function () {
        self.value = self.nextValue;
        self.timeoutHandle = null;
    }, ms);
    this.period = ms;
};

D6.prototype.draw = function () {
    var self = this;
    var roller = self.scope.components.roller.actualNode;
    var x = ((Math.random() * 2) * 360).toFixed(0);
    var y = ((Math.random() * 2) * 360).toFixed(0);
    roller.className = "die-roller"; // purges previous die-roll-# class
    roller.style.webkitTransition = "";
    roller.style.webkitTransform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
    requestAnimationFrame(function () {
        self.redraw();
    });
};

D6.prototype.redraw = function () {
    var self = this;
    var roller = self.scope.components.roller.actualNode;
    roller.style.webkitTransition = "-webkit-transform " + this.period + "ms linear";
    roller.style.webkitTransform = "";
    roller.classList.add("die-roll-" + this.nextValue);
};

D6.prototype.destroy = function () {
    if (this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = null;
    }
};

function roll() {

    var die1 = document.querySelector("#die-1");
    var die2 = document.querySelector("#die-2");
    var die3 = document.querySelector("#die-3");

    die1.className = "die-roller";
    die2.className = "die-roller";
    die3.className = "die-roller";

    var d1 = (Math.random() * 6 + 1).toFixed(0);
    var d2 = (Math.random() * 6 + 1).toFixed(0);
    var d3 = (Math.random() * 6 + 1).toFixed(0);

    var x = (Math.random() * 360).toFixed(0);
    var y = (Math.random() * 360).toFixed(0);
    die1.style.webkitTransition = "";
    die1.style.webkitTransform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
    var x = (Math.random() * 360).toFixed(0);
    var y = (Math.random() * 360).toFixed(0);
    die2.style.webkitTransition = "";
    die2.style.webkitTransform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
    var x = (Math.random() * 360).toFixed(0);
    var y = (Math.random() * 360).toFixed(0);
    die3.style.webkitTransition = "";
    die3.style.webkitTransform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";

    requestAnimationFrame(function () {

        die1.style.webkitTransition = "-webkit-transform .1s linear";
        die1.style.webkitTransform = "";
        die1.classList.add("die-roll-" + d1);

        die2.style.webkitTransition = "-webkit-transform .3s linear";
        die2.style.webkitTransform = "";
        die2.classList.add("die-roll-" + d2);

        die3.style.webkitTransition = "-webkit-transform .5s linear";
        die3.style.webkitTransform = "";
        die3.classList.add("die-roll-" + d3);

    });
}

