'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var pkgVersion = load.pkg().devDependencies.shep;
  return pkgVersion === _index.version ? [] : generateWarning(_index.version, pkgVersion);
};

var _index = require('../../index');

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function generateWarning(version, pkgVersion) {
  return [{
    rule: 'shep-version-mismatch',
    type: 'error',
    message: `shep ${version} is being used, but package.json requires ${pkgVersion}`
  }];
}
module.exports = exports['default'];