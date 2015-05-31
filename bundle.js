global = this;
(function (modules) {

    // Bundle allows the run-time to extract already-loaded modules from the
    // boot bundle.
    var bundle = {};
    var main;

    // Unpack module tuples into module objects.
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        module = modules[i] = new Module(
            module[0],
            module[1],
            module[2],
            module[3],
            module[4]
        );
        bundle[module.filename] = module;
    }

    function Module(id, dirname, basename, dependencies, factory) {
        this.id = id;
        this.dirname = dirname;
        this.filename = dirname + "/" + basename;
        // Dependency map and factory are used to instantiate bundled modules.
        this.dependencies = dependencies;
        this.factory = factory;
    }

    Module.prototype._require = function () {
        var module = this;
        if (module.exports === void 0) {
            module.exports = {};
            var require = function (id) {
                var index = module.dependencies[id];
                var dependency = modules[index];
                if (!dependency)
                    throw new Error("Bundle is missing a dependency: " + id);
                return dependency._require();
            };
            require.main = main;
            module.exports = module.factory(
                require,
                module.exports,
                module,
                module.filename,
                module.dirname
            ) || module.exports;
        }
        return module.exports;
    };

    // Communicate the bundle to all bundled modules
    Module.prototype.modules = bundle;

    return function require(filename) {
        main = bundle[filename];
        main._require();
    }
})([["d6.html","dice.html","d6.html",{"./d6":1},function (require, exports, module, __filename, __dirname){

// dice.html/d6.html
// -----------------

"use strict";
var $SUPER = require("./d6");
var $THIS = function DicehtmlD6(body, caller) {
    $SUPER.apply(this, arguments);
    var document = body.ownerDocument;
    var scope = this.scope = caller.root.nestComponents();
    scope.caller = caller;
    scope.this = this;
    var parent = body, parents = [], node, component, callee, argument;
    node = document.createElement("DIV");
    parent.appendChild(node);
    node.setAttribute("class", "die-container");
    parents[parents.length] = parent; parent = node;
    // DIV
        node = document.createElement("DIV");
        parent.appendChild(node);
        node.setAttribute("class", "die");
        parents[parents.length] = parent; parent = node;
        // DIV
            node = document.createElement("DIV");
            parent.appendChild(node);
            component = node;
            scope.set("roller", component);
            node.setAttribute("class", "die-1 die-roller");
            parents[parents.length] = parent; parent = node;
            // DIV
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-1");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚀"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-2");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚁"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-3");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚂"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-4");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚃"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-5");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚄"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
                node = document.createElement("DIV");
                parent.appendChild(node);
                node.setAttribute("class", "die-face-6");
                parents[parents.length] = parent; parent = node;
                // DIV
                    parent.appendChild(document.createTextNode("⚅"));
                node = parent; parent = parents[parents.length - 1]; parents.length--;
            node = parent; parent = parents[parents.length - 1]; parents.length--;
        node = parent; parent = parents[parents.length - 1]; parents.length--;
    node = parent; parent = parents[parents.length - 1]; parents.length--;
    this.scope.set("this", this);
};
$THIS.prototype = Object.create($SUPER.prototype);
$THIS.prototype.constructor = $THIS;
$THIS.prototype.exports = {};
module.exports = $THIS;

}],["d6.js","dice.html","d6.js",{},function (require, exports, module, __filename, __dirname){

// dice.html/d6.js
// ---------------

"use strict";

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
    requestAnimationFrame(function () {
        self.draw();
    });
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

}],["demo.html","dice.html","demo.html",{"./demo":3,"./d6.html":0},function (require, exports, module, __filename, __dirname){

// dice.html/demo.html
// -------------------

"use strict";
var $SUPER = require("./demo");
var $D6 = require("./d6.html");
var $THIS = function DicehtmlDemo(body, caller) {
    $SUPER.apply(this, arguments);
    var document = body.ownerDocument;
    var scope = this.scope = caller.root.nestComponents();
    scope.caller = caller;
    scope.this = this;
    var parent = body, parents = [], node, component, callee, argument;
    node = document.createBody();
    parent.appendChild(node);
    parents[parents.length] = parent; parent = node;
    // D6
        node = {tagName: "d6"};
        node.component = $THIS$0;
        callee = scope.nest();
        callee.argument = node;
        callee.id = "a";
        component = new $D6(parent, callee);
    node = parent; parent = parents[parents.length - 1]; parents.length--;
    scope.set("a", component);
    node = document.createBody();
    parent.appendChild(node);
    parents[parents.length] = parent; parent = node;
    // D6
        node = {tagName: "d6"};
        node.component = $THIS$1;
        callee = scope.nest();
        callee.argument = node;
        callee.id = "b";
        component = new $D6(parent, callee);
    node = parent; parent = parents[parents.length - 1]; parents.length--;
    scope.set("b", component);
    node = document.createBody();
    parent.appendChild(node);
    parents[parents.length] = parent; parent = node;
    // D6
        node = {tagName: "d6"};
        node.component = $THIS$2;
        callee = scope.nest();
        callee.argument = node;
        callee.id = "c";
        component = new $D6(parent, callee);
    node = parent; parent = parents[parents.length - 1]; parents.length--;
    scope.set("c", component);
    this.scope.set("this", this);
};
$THIS.prototype = Object.create($SUPER.prototype);
$THIS.prototype.constructor = $THIS;
$THIS.prototype.exports = {};
module.exports = $THIS;
var $THIS$0 = function DicehtmlDemo$0(body, caller) {
    var document = body.ownerDocument;
    var scope = this.scope = caller;
};
var $THIS$1 = function DicehtmlDemo$1(body, caller) {
    var document = body.ownerDocument;
    var scope = this.scope = caller;
};
var $THIS$2 = function DicehtmlDemo$2(body, caller) {
    var document = body.ownerDocument;
    var scope = this.scope = caller;
};

}],["demo.js","dice.html","demo.js",{},function (require, exports, module, __filename, __dirname){

// dice.html/demo.js
// -----------------

"use strict";

module.exports = Demo;
function Demo(body, scope) {
}

Demo.prototype.add = function add(component, id, scope) {
    if (id !== "this") {
        component.roll(500, Math.random() * 6);
    }
};

}],["index.js","dice.html","index.js",{"gutentag/document":5,"gutentag/scope":6,"./demo.html":2},function (require, exports, module, __filename, __dirname){

// dice.html/index.js
// ------------------

"use strict";
var Document = require("gutentag/document");
var Scope = require("gutentag/scope");
var Demo = require("./demo.html");

var scope = new Scope();
window.document.body.innerHTML = "";
var document = new Document(window.document.body);
var essay = new Demo(document.documentElement, scope);

}],["document.js","gutentag","document.js",{"koerper":7},function (require, exports, module, __filename, __dirname){

// gutentag/document.js
// --------------------

"use strict";
module.exports = require("koerper");

}],["scope.js","gutentag","scope.js",{},function (require, exports, module, __filename, __dirname){

// gutentag/scope.js
// -----------------

"use strict";

module.exports = Scope;
function Scope() {
    this.root = this;
    this.components = Object.create(null);
}

Scope.prototype.nest = function () {
    var child = Object.create(this);
    child.parent = this;
    child.caller = this.caller && this.caller.nest();
    return child;
};

Scope.prototype.nestComponents = function () {
    var child = this.nest();
    child.components = Object.create(this.components);
    return child;
};

Scope.prototype.set = function (id, component) {
    var scope = this;
    scope.components[id] = component;

    if (scope.this.add) {
        scope.this.add(component, id, scope);
    }

    var exportId = scope.this.exports && scope.this.exports[id];
    if (exportId) {
        var callerId = scope.caller.id;
        scope.caller.set(callerId + ":" + exportId, component);
    }
};

}],["koerper.js","koerper","koerper.js",{"wizdom":8},function (require, exports, module, __filename, __dirname){

// koerper/koerper.js
// ------------------

"use strict";

var BaseDocument = require("wizdom");
var BaseNode = BaseDocument.prototype.Node;
var BaseElement = BaseDocument.prototype.Element;
var BaseTextNode = BaseDocument.prototype.TextNode;

module.exports = Document;
function Document(actualNode) {
    Node.call(this, this);
    this.actualNode = actualNode;
    this.actualDocument = actualNode.ownerDocument;

    this.documentElement = this.createBody();
    this.documentElement.parentNode = this;
    actualNode.appendChild(this.documentElement.actualNode);

    this.firstChild = this.documentElement;
    this.lastChild = this.documentElement;
}

Document.prototype = Object.create(BaseDocument.prototype);
Document.prototype.Node = Node;
Document.prototype.Element = Element;
Document.prototype.TextNode = TextNode;
Document.prototype.Body = Body;
Document.prototype.OpaqueHtml = OpaqueHtml;

Document.prototype.createBody = function (label) {
    return new this.Body(this, label);
};

Document.prototype.getActualParent = function () {
    return this.actualNode;
};

function Node(document) {
    BaseNode.call(this, document);
    this.actualNode = null;
}

Node.prototype = Object.create(BaseNode.prototype);
Node.prototype.constructor = Node;

Node.prototype.insertBefore = function insertBefore(childNode, nextSibling) {
    if (nextSibling && nextSibling.parentNode !== this) {
        throw new Error("Can't insert before node that is not a child of parent");
    }
    BaseNode.prototype.insertBefore.call(this, childNode, nextSibling);
    var actualParentNode = this.getActualParent();
    var actualNextSibling;
    if (nextSibling) {
        actualNextSibling = nextSibling.getActualFirstChild();
    }
    if (!actualNextSibling) {
        actualNextSibling = this.getActualNextSibling();
    }
    if (actualNextSibling && actualNextSibling.parentNode !== actualParentNode) {
        actualNextSibling = null;
    }
    actualParentNode.insertBefore(childNode.actualNode, actualNextSibling || null);
    childNode.inject();
    return childNode;
};

Node.prototype.removeChild = function removeChild(childNode) {
    if (!childNode) {
        throw new Error("Can't remove child " + childNode);
    }
    childNode.extract();
    this.getActualParent().removeChild(childNode.actualNode);
    BaseNode.prototype.removeChild.call(this, childNode);
};

Node.prototype.setAttribute = function setAttribute(key, value) {
    this.actualNode.setAttribute(key, value);
};

Node.prototype.getAttribute = function getAttribute(key) {
    this.actualNode.getAttribute(key);
};

Node.prototype.hasAttribute = function hasAttribute(key) {
    this.actualNode.hasAttribute(key);
};

Node.prototype.removeAttribute = function removeAttribute(key) {
    this.actualNode.removeAttribute(key);
};

Node.prototype.addEventListener = function addEventListener(name, handler, capture) {
    this.actualNode.addEventListener(name, handler, capture);
};

Node.prototype.removeEventListener = function removeEventListener(name, handler, capture) {
    this.actualNode.removeEventListener(name, handler, capture);
};

Node.prototype.inject = function injectNode() { };

Node.prototype.extract = function extractNode() { };

Node.prototype.getActualParent = function () {
    return this.actualNode;
};

Node.prototype.getActualFirstChild = function () {
    return this.actualNode;
};

Node.prototype.getActualNextSibling = function () {
    return null;
};

Object.defineProperty(Node.prototype, "innerHTML", {
    get: function () {
        return this.actualNode.innerHTML;
    }//,
    //set: function (html) {
    //    // TODO invalidate any subcontained child nodes
    //    this.actualNode.innerHTML = html;
    //}
});

function Element(document, type) {
    BaseNode.call(this, document);
    this.tagName = type;
    this.actualNode = document.actualDocument.createElement(type);
    this.attributes = this.actualNode.attributes;
}

Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;
Element.prototype.nodeType = 1;

function TextNode(document, text) {
    Node.call(this, document);
    this.actualNode = document.actualDocument.createTextNode(text);
}

TextNode.prototype = Object.create(Node.prototype);
TextNode.prototype.constructor = TextNode;
TextNode.prototype.nodeType = 3;

Object.defineProperty(TextNode.prototype, "data", {
    set: function (data) {
        this.actualNode.data = data;
    },
    get: function () {
        return this.actualNode.data;
    }
});

// if parentNode is null, the body is extracted
// if parentNode is non-null, the body is inserted
function Body(document, label) {
    Node.call(this, document);
    this.actualNode = document.actualDocument.createTextNode("");
    //this.actualNode = document.actualDocument.createComment(label || "");
    this.actualFirstChild = null;
    this.actualBody = document.actualDocument.createElement("BODY");
}

Body.prototype = Object.create(Node.prototype);
Body.prototype.constructor = Body;
Body.prototype.nodeType = 13;

Body.prototype.extract = function extract() {
    var body = this.actualBody;
    var lastChild = this.actualNode;
    var parentNode = this.parentNode.getActualParent();
    var at = this.getActualFirstChild();
    var next;
    while (at && at !== lastChild) {
        next = at.nextSibling;
        if (body) {
            body.appendChild(at);
        } else {
            parentNode.removeChild(at);
        }
        at = next;
    }
};

Body.prototype.inject = function inject() {
    if (!this.parentNode) {
        throw new Error("Can't inject without a parent node");
    }
    var body = this.actualBody;
    var lastChild = this.actualNode;
    var parentNode = this.parentNode.getActualParent();
    var at = body.firstChild;
    var next;
    while (at) {
        next = at.nextSibling;
        parentNode.insertBefore(at, lastChild);
        at = next;
    }
};

Body.prototype.getActualParent = function () {
    if (this.parentNode) {
        return this.parentNode.getActualParent();
    } else {
        return this.actualBody;
    }
};

Body.prototype.getActualFirstChild = function () {
    if (this.firstChild) {
        return this.firstChild.getActualFirstChild();
    }
};

Body.prototype.getActualNextSibling = function () {
    return this.actualNode;
};

Object.defineProperty(Body.prototype, "innerHTML", {
    get: function () {
        if (this.parentNode) {
            this.extract();
            var html = this.actualBody.innerHTML;
            this.inject();
            return html;
        } else {
            return this.actualBody.innerHTML;
        }
    },
    set: function (html) {
        if (this.parentNode) {
            this.extract();
            this.actualBody.innerHTML = html;
            this.firstChild = this.lastChild = new OpaqueHtml(
                this.ownerDocument,
                this.actualBody
            );
            this.inject();
        } else {
            this.actualBody.innerHTML = html;
            this.firstChild = this.lastChild = new OpaqueHtml(
                this.ownerDocument,
                this.actualBody
            );
        }
        return html;
    }
});

function OpaqueHtml(ownerDocument, body) {
    Node.call(this, ownerDocument);
    this.actualFirstChild = body.firstChild;
}

OpaqueHtml.prototype = Object.create(Node.prototype);
OpaqueHtml.prototype.constructor = OpaqueHtml;

OpaqueHtml.prototype.getActualFirstChild = function getActualFirstChild() {
    return this.actualFirstChild;
};

}],["dom.js","wizdom","dom.js",{},function (require, exports, module, __filename, __dirname){

// wizdom/dom.js
// -------------

"use strict";

module.exports = Document;
function Document() {
    this.doctype = null;
    this.documentElement = null;
}

Document.prototype.nodeType = 9;
Document.prototype.Node = Node;
Document.prototype.Element = Element;
Document.prototype.TextNode = TextNode;
Document.prototype.Comment = Comment;
Document.prototype.Attr = Attr;
Document.prototype.NamedNodeMap = NamedNodeMap;

Document.prototype.createTextNode = function (text) {
    return new this.TextNode(this, text);
};

Document.prototype.createComment = function (text) {
    return new this.Comment(this, text);
};

Document.prototype.createElement = function (type) {
    return new this.Element(this, type);
};

Document.prototype.createAttribute = function (name) {
    return new this.Attr(this, name);
};

function Node(document) {
    this.ownerDocument = document;
    this.parentNode = null;
    this.firstChild = null;
    this.lastChild = null;
    this.previousSibling = null;
    this.nextSibling = null;
}

Node.prototype.appendChild = function appendChild(childNode) {
    return this.insertBefore(childNode, null);
};

Node.prototype.insertBefore = function insertBefore(childNode, nextSibling) {
    if (!childNode) {
        throw new Error("Can't insert null child");
    }
    if (childNode.ownerDocument !== this.ownerDocument) {
        throw new Error("Can't insert child from foreign document");
    }
    if (childNode.parentNode) {
        childNode.parentNode.removeChild(childNode);
    }
    var previousSibling;
    if (nextSibling) {
        previousSibling = nextSibling.previousSibling;
    } else {
        previousSibling = this.lastChild;
    }
    if (previousSibling) {
        previousSibling.nextSibling = childNode;
    }
    if (nextSibling) {
        nextSibling.previousSibling = childNode;
    }
    childNode.nextSibling = nextSibling;
    childNode.previousSibling = previousSibling;
    childNode.parentNode = this;
    if (!nextSibling) {
        this.lastChild = childNode;
    }
    if (!previousSibling) {
        this.firstChild = childNode;
    }
};

Node.prototype.removeChild = function removeChild(childNode) {
    if (!childNode) {
        throw new Error("Can't remove null child");
    }
    var parentNode = childNode.parentNode;
    if (parentNode !== this) {
        throw new Error("Can't remove node that is not a child of parent");
    }
    if (childNode === parentNode.firstChild) {
        parentNode.firstChild = childNode.nextSibling;
    }
    if (childNode === parentNode.lastChild) {
        parentNode.lastChild = childNode.previousSibling;
    }
    if (childNode.previousSibling) {
        childNode.previousSibling.nextSibling = childNode.nextSibling;
    }
    if (childNode.nextSibling) {
        childNode.nextSibling.previousSibling = childNode.previousSibling;
    }
    childNode.previousSibling = null;
    childNode.parentNode = null;
    childNode.nextSibling = null;
    return childNode;
};

function TextNode(document, text) {
    Node.call(this, document);
    this.data = text;
}

TextNode.prototype = Object.create(Node.prototype);
TextNode.prototype.constructor = TextNode;
TextNode.prototype.nodeType = 3;

function Comment(document, text) {
    Node.call(this, document);
    this.data = text;
}

Comment.prototype = Object.create(Node.prototype);
Comment.prototype.constructor = Comment;
Comment.prototype.nodeType = 8;

function Element(document, type) {
    Node.call(this, document);
    this.tagName = type;
    this.attributes = new this.ownerDocument.NamedNodeMap();
}

Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;
Element.prototype.nodeType = 1;

Element.prototype.hasAttribute = function (name) {
    var attr = this.attributes.getNamedItem(name);
    return !!attr;
};

Element.prototype.getAttribute = function (name) {
    var attr = this.attributes.getNamedItem(name);
    return attr ? attr.value : null;
};

Element.prototype.setAttribute = function (name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = value;
    this.attributes.setNamedItem(attr);
};

Element.prototype.removeAttribute = function (name) {
    this.attributes.removeNamedItem(name);
};

function Attr(ownerDocument, name) {
    this.ownerDocument = ownerDocument;
    this.name = name;
    this.value = null;
}

Attr.prototype.nodeType = 2;

function NamedNodeMap() {
    this.length = 0;
}

NamedNodeMap.prototype.getNamedItem = function (name) {
    return this[name];
};

NamedNodeMap.prototype.setNamedItem = function (attr) {
    var name = attr.name;
    var previousAttr = this[name];
    if (!previousAttr) {
        this[this.length] = attr;
        this.length++;
        previousAttr = null;
    }
    this[name] = attr;
    return previousAttr;
};

NamedNodeMap.prototype.removeNamedItem = function (name) {
    var name = attr.name;
    var attr = this[name];
    if (!attr) {
        throw new Error("Not found");
    }
    var index = Array.prototype.indexOf.call(this, attr);
    delete this[name];
    delete this[index];
    this.length--;
};

NamedNodeMap.prototype.item = function (index) {
    return this[index];
};


}]])("dice.html/index.js")
