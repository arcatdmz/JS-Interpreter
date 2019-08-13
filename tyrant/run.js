#!/usr/bin/env node
/**
 * This script is a command line runner for JS-Interpreter.
 * It exposes a few "native" apis that can be used in the
 * script being interpreted:
 *
 * 1. console.log(...args: string[]) - just a pass through to
 *        node's native console.log implementation
 *
 * 2. vm.runInContext(source: string, context: Object) - executes
 *        the interpreter against the given source, using the context
 *        object for the global scope.
 *
 * Usage:
 *   js-interpreter <filepath.js>
 */

window = typeof window === 'undefined' ? global : window;
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');

const argv = yargs
  .usage(`Usage: $0 <filepath.js>`)
  .help('h')
  .alias('h', 'help')

  .nargs('interpreter', 1)
  .describe('interpreter', 'path to interpreter module to use')
  .describe('forked', 'run this as a forked process').argv;

const buildInterpreter = require('./interpreter-builder.js');
const Interpreter = require(argv.interpreter
  ? path.resolve(argv.interpreter)
  : '../dist/interpreter');
Interpreter.acorn = require('../lib/acorn');
if (argv.forked) {
  process.on('message', code => {
    try {
      buildInterpreter(Interpreter, code, {
        log(...args) {
          process.send({ status: 'log', message: args.join(' ') + '\n' });
        },
      }).run();
      process.send({ status: 'done' });
    } catch (e) {
      process.send({ status: 'error', message: e.stack });
    }
  });
} else {
  if (argv._.length < 1) {
    console.log('you must specify a file to execute.');
    process.exit(1);
  }
  const code = fs.readFileSync(argv._[0], 'utf-8');
  buildInterpreter(Interpreter, code).run();
}
