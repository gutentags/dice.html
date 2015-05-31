"use strict";

module.exports = Demo;
function Demo(body, scope) {
}

Demo.prototype.add = function add(component, id, scope) {
    if (id !== "this") {
        component.roll(500, Math.random() * 6);
    }
};
