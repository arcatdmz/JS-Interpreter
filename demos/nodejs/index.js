"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn = require("acorn");
var Interpreter = require("../../dist/interpreter");
Interpreter.acorn = acorn;
// Test the interpreter.
var interpreter = new Interpreter('var map = new Map([["key1", "value1"], ["key2", "value2"]]);map.get("key1");');
interpreter.run();
console.log('1 + 2 = ' + interpreter.value); // shows '1 + 2 = 3' in the console
//# sourceMappingURL=index.js.map