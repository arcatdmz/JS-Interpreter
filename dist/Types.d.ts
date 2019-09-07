import * as ESTree from 'estree';
import { MyObject } from './MyObject';
/**
 * Typedef for JS values.
 * @typedef {!MyObject|boolean|number|string|undefined|null}
 */
export declare type MyValue = MyObject | boolean | number | string | undefined | null;
export interface MyValueTable {
    pseudo: MyValue[];
    native: any[];
}
export interface MyDescriptor {
    get?: MyObject;
    set?: MyObject;
    configurable?: boolean;
    enumerable?: boolean;
    writable?: boolean;
    value?: any;
}
export interface Acorn {
    parse(code: string, options?: any): ESTree.Program;
}
export interface NodeConstructor {
    new (parser: {
        options: Object;
    }): ESTree.BaseNode;
}
export interface NativeFunction extends Function {
    id?: number;
}
