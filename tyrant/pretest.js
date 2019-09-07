// もし../node_modules/test262-harness/node_modules/eshostがあったら消す。
// tyrant内のnode_modulesの方を参照しないとjs-interpreterを扱えないため。

// ../node_modules/eshost/lib/ConsoleAgent.jsの
// cp.spawn(this.hostPath, args);
// を以下に置換
// cp.spawn('node', [this.hostPath, args]);
// こうでないと(少なくとも)windowsでは正しく起動できなかった。

var fs = require('fs');
var path = require('path');

function check(filePath) {
  var isExist = false;
  try {
    fs.statSync(filePath);
    isExist = true;
  } catch (err) {
    isExist = false;
  }
  return isExist;
}

function read(filePath) {
  var content = new String();
  if (check(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
  }
  return content;
}

function write(filePath, stream) {
  try {
    fs.writeFileSync(filePath, stream);
    return true;
  } catch (err) {
    return false;
  }
}

var filepath = path.resolve(__dirname, '../node_modules/eshost/lib/ConsoleAgent.js');
var content = read(filepath);
var toReplaceStr = 'cp.spawn(this.hostPath, args);';
if (content.includes(toReplaceStr)) {
  var result = content.replace(toReplaceStr, "cp.spawn('node', [this.hostPath, args]);");
  write(filepath, result);
}
var dirpath = path.resolve(__dirname, '../node_modules/test262-harness/node_modules/eshost');
if (check(dirpath)) {
  fs.renameSync(dirpath, path.resolve(path.dirname(dirpath), 'eshost_unused'));
}
