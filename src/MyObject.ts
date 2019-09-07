import { Interpreter } from './Interpreter';

/**
 * Class for an object.
 * @param {MyObject} proto Prototype object or null.
 * @constructor
 */
export class MyObject {
  [key: string]: any;

  getter: any;
  setter: any;
  properties: any;

  constructor(proto) {
    this.getter = Object.create(null);
    this.setter = Object.create(null);
    this.properties = Object.create(null);
    this.proto = proto;
  }

  /** @type {MyObject} */
  proto: MyObject = null;

  /** @type {boolean} */
  isObject = true;

  /** @type {string} */
  class = 'Object';

  /** @type {Date|RegExp|boolean|number|string|undefined|null} */
  data: Date | RegExp | boolean | number | string | undefined | null = null;

  /**
   * Convert this object into a string.
   * @return {string} String value.
   * @override
   */
  toString() {
    if (this.class === 'Array') {
      // Array
      var cycles = Interpreter.toStringCycles_;
      cycles.push(this);
      try {
        var strs = [];
        for (var i = 0; i < this.properties.length; i++) {
          var value = this.properties[i];
          strs[i] = value && value.isObject && cycles.indexOf(value) !== -1 ? '...' : value;
        }
      } finally {
        cycles.pop();
      }
      return strs.join(',');
    }
    if (this.class === 'Error') {
      var cycles = Interpreter.toStringCycles_;
      if (cycles.indexOf(this) !== -1) {
        return '[object Error]';
      }
      var name, message;
      // Bug: Does not support getters and setters for name or message.
      var obj = <MyObject>this;
      do {
        if ('name' in obj.properties) {
          name = obj.properties['name'];
          break;
        }
      } while ((obj = obj.proto));
      var obj = <MyObject>this;
      do {
        if ('message' in obj.properties) {
          message = obj.properties['message'];
          break;
        }
      } while ((obj = obj.proto));
      cycles.push(this);
      try {
        name = name && name.toString();
        message = message && message.toString();
      } finally {
        cycles.pop();
      }
      return message ? name + ': ' + message : String(name);
    }

    // RegExp, Date, and boxed primitives.
    if (this.data !== null) {
      return String(this.data);
    }

    return '[object ' + this.class + ']';
  }

  /**
   * Return the object's value.
   * @return {MyValue} Value.
   * @override
   */
  valueOf() {
    if (this.data === undefined || this.data === null || this.data instanceof RegExp) {
      return this; // An Object.
    }
    if (this.data instanceof Date) {
      return this.data.valueOf(); // Milliseconds.
    }
    return /** @type {(boolean|number|string)} */ this.data; // Boxed primitive.
  }
}
