/**
 * Class for an object.
 * @param {MyObject} proto Prototype object or null.
 * @constructor
 */
export declare class MyObject {
    [key: string]: any;
    getter: any;
    setter: any;
    properties: any;
    constructor(proto: any);
    /** @type {MyObject} */
    proto: MyObject;
    /** @type {boolean} */
    isObject: boolean;
    /** @type {string} */
    class: string;
    /** @type {Date|RegExp|boolean|number|string|undefined|null} */
    data: Date | RegExp | boolean | number | string | undefined | null;
    /**
     * Convert this object into a string.
     * @return {string} String value.
     * @override
     */
    toString(): string;
    /**
     * Return the object's value.
     * @return {MyValue} Value.
     * @override
     */
    valueOf(): string | number | boolean | this;
}
