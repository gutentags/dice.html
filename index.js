"use strict";
var Document = require("gutentag/document");
var Scope = require("gutentag/scope");
var Demo = require("./demo.html");

var scope = new Scope();
window.document.body.innerHTML = "";
var document = new Document(window.document.body);
var essay = new Demo(document.documentElement, scope);
