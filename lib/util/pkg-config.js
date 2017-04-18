'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;

var _fs = require('./modules/fs');

var _load = require('./load');

var load = _interopRequireWildcard(_load);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function update(obj) {
  var pkg = load.pkg();
  if (!pkg.shep) {
    pkg.shep = {};
  }
  Object.keys(obj).forEach(function (key) {
    pkg.shep[key] = obj[key];
  });
  return (0, _fs.writeJSON)('package.json', pkg, { spaces: 2 });
}