'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (pattern, env) {
  return _bluebird2.default.resolve((0, _load.funcs)(pattern)).map(function (func) {
    return _bluebird2.default.join(env, (0, _load.lambdaConfig)(func), (0, _zipDir2.default)(`dist/${func}`), _lambda.putFunction);
  });
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _zipDir = require('./zip-dir');

var _zipDir2 = _interopRequireDefault(_zipDir);

var _lambda = require('./aws/lambda');

var _load = require('./load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];