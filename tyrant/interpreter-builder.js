module.exports = function buildInterpreter(Interpreter, code, console) {
  if (!console) {
    console = global.console;
  }
  function createConsoleObject(interpreter) {
    const myConsole = interpreter.createObject(interpreter.OBJECT);
    // add log function to console object
    function myLog() {
      for (let j = 0; j < arguments.length; j++) {
        arguments[j] = arguments[j].toString();
      }
      return console.log.apply(console, arguments);
    }
    interpreter.setProperty(
      myConsole,
      'log',
      interpreter.createNativeFunction(myLog),
      Interpreter.NONENUMERABLE_DESCRIPTOR
    );
    return myConsole;
  }

  function createVMObject(interpreter) {
    const vm = interpreter.createObject(interpreter.OBJECT);
    function runInContext(source, context) {
      const interp = new Interpreter(source.toString(), function(
        interpreter,
        scope
      ) {
        initInterpreterScope(interpreter, scope);
        for (let key in context.properties) {
          interpreter.setProperty(scope, key, context.properties[key]);
        }
      });
      interp.run();
    }

    interpreter.setProperty(
      vm,
      'runInContext',
      interpreter.createNativeFunction(runInContext),
      Interpreter.NONENUMERABLE_DESCRIPTOR
    );
    return vm;
  }

  // adds "native" global properties to the interpreter's scope
  function initInterpreterScope(interpreter, scope) {
    // add native console object to global interpreter scope
    interpreter.setProperty(scope, 'console', createConsoleObject(interpreter));

    // add vm object
    interpreter.setProperty(scope, 'vm', createVMObject(interpreter));
  }
  return new Interpreter(code, initInterpreterScope);
};
