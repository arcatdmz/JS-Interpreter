import * as ESTree from 'estree';
import { MyObject } from './MyObject';

/**
 * Class for a state.
 * @param {!MyObject} node AST node for the state.
 * @param {!MyObject} scope Scope object for the state.
 * @constructor
 */
export class MyState {
  [key: string]: any;

  node: ESTree.BaseNode;
  scope: MyObject;

  constructor(node: ESTree.BaseNode, scope: MyObject) {
    this.node = node;
    this.scope = scope;
  }
}
