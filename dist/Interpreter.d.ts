import { Options } from 'acorn';
import * as ESTree from 'estree';
import { MyState } from './MyState';
import { MyDescriptor, MyValue, MyValueTable, NativeFunction } from './Types';
import { MyObject } from './MyObject';
/**
 * @license
 * JavaScript Interpreter
 *
 * Copyright 2013-2017 Google Inc. and Jun Kato
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Interpreting JavaScript in JavaScript.
 * @author fraser@google.com (Neil Fraser)
 * @author i@junkato.jp (Jun Kato)
 */
/**
 * Create a new interpreter.
 * @param {string|!Object} code Raw JavaScript text or AST.
 * @param {Function=} opt_initFunc Optional initialization function.  Used to
 *     define APIs.  When called it is passed the interpreter object and the
 *     global scope object.
 * @constructor
 */
export declare class Interpreter {
    private nodeConstructor;
    ast: ESTree.Program;
    global: MyObject;
    stateStack: MyState[];
    value: MyValue;
    private initFunc_;
    private paused_;
    private polyfills_;
    private functionCounter_;
    private stepFunctions_;
    OBJECT: MyObject;
    OBJECT_PROTO: MyObject;
    FUNCTION: MyObject;
    FUNCTION_PROTO: MyObject;
    ARRAY: MyObject;
    ARRAY_PROTO: MyObject;
    MAP: MyObject;
    MAP_PROTO: MyObject;
    SET: MyObject;
    SET_PROTO: MyObject;
    REGEXP: MyObject;
    REGEXP_PROTO: MyObject;
    ERROR: MyObject;
    EVAL_ERROR: MyObject;
    RANGE_ERROR: MyObject;
    REFERENCE_ERROR: MyObject;
    SYNTAX_ERROR: MyObject;
    TYPE_ERROR: MyObject;
    URI_ERROR: MyObject;
    STRING: MyObject;
    BOOLEAN: MyObject;
    NUMBER: MyObject;
    DATE: MyObject;
    UNDEFINED: MyObject;
    NULL: null;
    NAN: number;
    TRUE: boolean;
    FALSE: boolean;
    STRING_EMPTY: string;
    NUMBER_ZERO: number;
    NUMBER_ONE: number;
    constructor(code: string | ESTree.Program, opt_initFunc?: (i: Interpreter, scope: MyObject) => void);
    /**
     * @const {!Object} Configuration used for all Acorn parsing.
     */
    static PARSE_OPTIONS: Options;
    /**
     * Property descriptor of readonly properties.
     */
    static READONLY_DESCRIPTOR: MyDescriptor;
    /**
     * Property descriptor of non-enumerable properties.
     */
    static NONENUMERABLE_DESCRIPTOR: MyDescriptor;
    /**
     * Property descriptor of readonly, non-enumerable properties.
     */
    static READONLY_NONENUMERABLE_DESCRIPTOR: MyDescriptor;
    /**
     * Property descriptor of variables.
     */
    static VARIABLE_DESCRIPTOR: MyDescriptor;
    /**
     * Unique symbol for indicating that a step has encountered an error, has
     * added it to the stack, and will be thrown within the user's program.
     * When STEP_ERROR is thrown in the JS-Interpreter, the error can be ignored.
     */
    static STEP_ERROR: {};
    /**
     * Unique symbol for indicating that a reference is a variable on the scope,
     * not an object property.
     */
    static SCOPE_REFERENCE: {};
    /**
     * For cycle detection in array to string and error conversion;
     * see spec bug github.com/tc39/ecma262/issues/289
     * Since this is for atomic actions only, it can be a class property.
     */
    static toStringCycles_: any[];
    /**
     * Add more code to the interpreter.
     * @param {string|!Object} code Raw JavaScript text or AST.
     */
    appendCode(code: string | ESTree.Node): void;
    /**
     * Execute one step of the interpreter.
     * @return {boolean} True if a step was executed, false if no more instructions.
     */
    step(): boolean;
    /**
     * Execute the interpreter to program completion.  Vulnerable to infinite loops.
     * @return {boolean} True if a execution is asynchronously blocked,
     *     false if no more instructions.
     */
    run(): boolean;
    /**
     * Initialize the global scope with buitin properties and functions.
     * @param {!MyObject} scope Global scope.
     */
    initGlobalScope(scope: MyObject): void;
    /**
     * Initialize the Function class.
     * @param {!MyObject} scope Global scope.
     */
    initFunction(scope: MyObject): void;
    /**
     * Initialize the Object class.
     * @param {!MyObject} scope Global scope.
     */
    initObject(scope: MyObject): void;
    /**
     * Initialize the Array class.
     * @param {!MyObject} scope Global scope.
     */
    initArray(scope: MyObject): void;
    /**
     * Initialize the Map class.
     * @param {!MyObject} scope Global scope.
     */
    initMap(scope: MyObject): void;
    /**
     * Initialize the Set class.
     * @param {!MyObject} scope Global scope.
     */
    initSet(scope: MyObject): void;
    /**
     * Initialize the String class.
     * @param {!MyObject} scope Global scope.
     */
    initString(scope: MyObject): void;
    /**
     * Initialize the Boolean class.
     * @param {!MyObject} scope Global scope.
     */
    initBoolean(scope: MyObject): void;
    /**
     * Initialize the Number class.
     * @param {!MyObject} scope Global scope.
     */
    initNumber(scope: MyObject): void;
    /**
     * Initialize the Date class.
     * @param {!MyObject} scope Global scope.
     */
    initDate(scope: MyObject): void;
    /**
     * Initialize Regular Expression object.
     * @param {!MyObject} scope Global scope.
     */
    initRegExp(scope: MyObject): void;
    /**
     * Initialize the Error class.
     * @param {!MyObject} scope Global scope.
     */
    initError(scope: MyObject): void;
    /**
     * Initialize Math object.
     * @param {!MyObject} scope Global scope.
     */
    initMath(scope: MyObject): void;
    /**
     * Initialize JSON object.
     * @param {!MyObject} scope Global scope.
     */
    initJSON(scope: MyObject): void;
    /**
     * Is an object of a certain class?
     * @param {MyValue} child Object to check.
     * @param {MyObject} constructor Constructor of object.
     * @return {boolean} True if object is the class or inherits from it.
     *     False otherwise.
     */
    isa(child: MyValue, constructor: MyObject): boolean;
    /**
     * Is a value a legal integer for an array length?
     * @param {MyValue} x Value to check.
     * @return {number} Zero, or a positive integer if the value can be
     *     converted to such.  NaN otherwise.
     */
    static legalArrayLength(x: MyValue): number;
    /**
     * Is a value a legal integer for an array index?
     * @param {MyValue} x Value to check.
     * @return {number} Zero, or a positive integer if the value can be
     *     converted to such.  NaN otherwise.
     */
    static legalArrayIndex(x: MyValue): number;
    /**
     * Create a new data object based on a constructor's prototype.
     * @param {MyObject} constructor Parent constructor function,
     *     or null if scope object.
     * @return {!MyObject} New data object.
     */
    createObject(constructor: MyObject): MyObject;
    /**
     * Create a new data object based on a prototype.
     * @param {MyObject} proto Prototype object.
     * @return {!MyObject} New data object.
     */
    createObjectProto(proto: MyObject): MyObject;
    /**
     * Initialize a pseudo regular expression object based on a native regular
     * expression object.
     * @param {!MyObject} pseudoRegexp The existing object to set.
     * @param {!RegExp} nativeRegexp The native regular expression.
     */
    populateRegExp(pseudoRegexp: MyObject, nativeRegexp: RegExp): void;
    /**
     * Create a new function.
     * @param {!Object} node AST node defining the function.
     * @param {!Object} scope Parent scope.
     * @return {!MyObject} New function.
     */
    createFunction(node: ESTree.FunctionDeclaration, scope: MyObject): MyObject;
    /**
     * Create a new native function.
     * @param {!Function} nativeFunc JavaScript function.
     * @param {boolean=} opt_constructor If true, the function's
     * prototype will have its constructor property set to the function.
     * If false, the function cannot be called as a constructor (e.g. escape).
     * Defaults to undefined.
     * @return {!MyObject} New function.
     */
    createNativeFunction(nativeFunc: NativeFunction, opt_constructor?: boolean): MyObject;
    /**
     * Create a new native asynchronous function.
     * @param {!Function} asyncFunc JavaScript function.
     * @return {!MyObject} New function.
     */
    createAsyncFunction(asyncFunc: any): MyObject;
    /**
     * Converts from a native JS object or value to a JS interpreter object.
     * Can handle JSON-style values.
     * @param {*} nativeObj The native JS object to be converted.
     * @return {MyValue} The equivalent JS interpreter object.
     */
    nativeToPseudo(nativeObj: any): MyValue;
    /**
     * Converts from a JS interpreter object to native JS object.
     * Can handle JSON-style values, plus cycles.
     * @param {MyValue} pseudoObj The JS interpreter object to be
     * converted.
     * @param {Object=} opt_cycles Cycle detection (used in recursive calls).
     * @return {*} The equivalent native JS object or value.
     */
    pseudoToNative(pseudoObj: MyValue, opt_cycles?: MyValueTable): any;
    /**
     * Look up the prototype for this value.
     * @param {MyValue} value Data object.
     * @return {MyObject} Prototype object, null if none.
     */
    getPrototype(value: MyValue): MyObject;
    /**
     * Fetch a property value from a data object.
     * @param {MyValue} obj Data object.
     * @param {MyValue} name Name of property.
     * @return {MyValue} Property value (may be undefined).
     */
    getProperty(obj: MyValue, name: MyValue): MyValue;
    /**
     * Does the named property exist on a data object.
     * @param {MyValue} obj Data object.
     * @param {MyValue} name Name of property.
     * @return {boolean} True if property exists.
     */
    hasProperty(obj: MyValue, name: MyValue): boolean;
    /**
     * Set a property value on a data object.
     * @param {!MyObject} obj Data object.
     * @param {MyValue} name Name of property.
     * @param {MyValue|ReferenceError} value New property value.
     *   Use ReferenceError if value is handled by descriptor instead.
     * @param {Object=} opt_descriptor Optional descriptor object.
     * @return {!MyObject|undefined} Returns a setter function if one
     *     needs to be called, otherwise undefined.
     */
    setProperty(obj: MyObject, name: MyValue, value: MyValue | ReferenceErrorConstructor, opt_descriptor?: any): MyObject;
    /**
     * Convenience method for adding a native function as a non-enumerable property
     * onto an object's prototype.
     * @param {!MyObject} obj Data object.
     * @param {MyValue} name Name of property.
     * @param {!Function} wrapper Function object.
     */
    private setNativeFunctionPrototype;
    /**
     * Returns the current scope from the stateStack.
     * @return {!MyObject} Current scope dictionary.
     */
    getScope(): MyObject;
    /**
     * Create a new scope dictionary.
     * @param {!Object} node AST node defining the scope container
     *     (e.g. a function).
     * @param {MyObject} parentScope Scope to link to.
     * @return {!MyObject} New scope.
     */
    createScope(node: ESTree.Node, parentScope: MyObject): MyObject;
    /**
     * Create a new special scope dictionary. Similar to createScope(), but
     * doesn't assume that the scope is for a function body.
     * This is used for 'catch' clauses and 'with' statements.
     * @param {!MyObject} parentScope Scope to link to.
     * @param {MyObject=} opt_scope Optional object to transform into
     *     scope.
     * @return {!MyObject} New scope.
     */
    createSpecialScope(parentScope: MyObject, opt_scope?: MyObject): MyObject;
    /**
     * Retrieves a value from the scope chain.
     * @param {string} name Name of variable.
     * @return {MyValue} Any value.
     *   May be flagged as being a getter and thus needing immediate execution
     *   (rather than being the value of the property).
     */
    getValueFromScope(name: string): MyValue;
    /**
     * Sets a value to the current scope.
     * @param {string} name Name of variable.
     * @param {MyValue} value Value.
     * @return {!MyObject|undefined} Returns a setter function if one
     *     needs to be called, otherwise undefined.
     */
    setValueToScope(name: string, value: MyValue): MyObject;
    /**
     * Create a new scope for the given node.
     * @param {!Object} node AST node (program or function).
     * @param {!MyObject} scope Scope dictionary to populate.
     * @private
     */
    populateScope_(node: ESTree.Node, scope: MyObject): void;
    /**
     * Remove start and end values from AST, or set start and end values to a
     * constant value.  Used to remove highlighting from polyfills and to set
     * highlighting in an eval to cover the entire eval expression.
     * @param {!Object} node AST node.
     * @param {number=} start Starting character of all nodes, or undefined.
     * @param {number=} end Ending character of all nodes, or undefined.
     * @private
     */
    private stripLocations_;
    /**
     * Is the current state directly being called with as a construction with 'new'.
     * @return {boolean} True if 'new foo()', false if 'foo()'.
     */
    calledWithNew(): boolean;
    /**
     * Gets a value from the scope chain or from an object property.
     * @param {!Array} ref Name of variable or object/propname tuple.
     * @return {MyValue} Any value.
     *   May be flagged as being a getter and thus needing immediate execution
     *   (rather than being the value of the property).
     */
    getValue(ref: any): MyValue;
    /**
     * Sets a value to the scope chain or to an object property.
     * @param {!Array} ref Name of variable or object/propname tuple.
     * @param {MyValue} value Value.
     * @return {!MyObject|undefined} Returns a setter function if one
     *     needs to be called, otherwise undefined.
     */
    setValue(ref: Array<any> & {
        0: MyObject;
        1: string;
    }, value: MyValue): MyObject;
    /**
     * Throw an exception in the interpreter that can be handled by an
     * interpreter try/catch statement.  If unhandled, a real exception will
     * be thrown.  Can be called with either an error class and a message, or
     * with an actual object to be thrown.
     * @param {!MyObject} errorClass Type of error (if message is
     *   provided) or the value to throw (if no message).
     * @param {string=} opt_message Message being thrown.
     */
    throwException(errorClass: MyObject, opt_message?: string): void;
    /**
     * Throw an exception in the interpreter that can be handled by a
     * interpreter try/catch statement.  If unhandled, a real exception will
     * be thrown.
     * @param {!MyObject} error Error object to execute.
     */
    executeException(error: MyObject): void;
    /**
     * Create a call to a getter function.
     * @param {!MyObject} func Function to execute.
     * @param {!MyObject|!Array} left
     *     Name of variable or object/propname tuple.
     * @private
     */
    createGetter_(func: MyObject, left: MyObject | Array<MyObject>): MyState;
    /**
     * Create a call to a setter function.
     * @param {!MyObject} func Function to execute.
     * @param {!MyObject|!Array} left
     *     Name of variable or object/propname tuple.
     * @param {MyValue} value Value to set.
     * @private
     */
    createSetter_(func: MyObject, left: MyObject | Array<MyObject>, value: MyValue): MyState;
    private stepArrayExpression;
    private stepAssignmentExpression;
    private stepBinaryExpression;
    private stepBlockStatement;
    private stepBreakStatement;
    private stepCallExpression;
    private stepCatchClause;
    private stepConditionalExpression;
    private stepContinueStatement;
    private stepDebuggerStatement;
    private stepDoWhileStatement;
    private stepEmptyStatement;
    private stepEvalProgram_;
    private stepExpressionStatement;
    private stepForInStatement;
    private stepForOfStatement;
    private stepForStatement;
    private stepFunctionDeclaration;
    private stepFunctionExpression;
    private stepIdentifier;
    private stepIfStatement;
    private stepLabeledStatement;
    private stepLiteral;
    private stepLogicalExpression;
    private stepMemberExpression;
    private stepNewExpression;
    private stepObjectExpression;
    private stepProgram;
    private stepReturnStatement;
    private stepSequenceExpression;
    private stepSwitchStatement;
    private stepThisExpression;
    private stepThrowStatement;
    private stepTryStatement;
    private stepUnaryExpression;
    private stepUpdateExpression;
    private stepVariableDeclaration;
    private stepWithStatement;
    private stepWhileStatement;
}
