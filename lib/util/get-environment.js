'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _lambda = require('./aws/lambda');

var _load = require('./load');

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(function* (env, name) {
    var fns = yield (0, _load.funcs)(name);
    return Promise.all(fns.map(function () {
      var _ref2 = (0, _bluebird.coroutine)(function* (func) {
        return yield (0, _lambda.getEnvironment)(env, (0, _load.lambdaConfig)(func));
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