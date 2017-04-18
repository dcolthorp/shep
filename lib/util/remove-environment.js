'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lambda = require('./aws/lambda');

var _load = require('./load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = '*';

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(function* (env, vars) {
    var fns = yield (0, _load.funcs)(pattern);
    return _bluebird2.default.all(fns.map(function () {
      var _ref2 = (0, _bluebird.coroutine)(function* (func) {
        return yield (0, _lambda.removeEnvVars)(env, (0, _load.lambdaConfig)(func), vars);
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }()));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];