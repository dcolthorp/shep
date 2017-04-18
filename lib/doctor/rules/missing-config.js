'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var funcNames = (0, _load.funcs)('*');
  var configs = funcNames.map(_load.lambdaConfig);
  var warnConfigs = configs.filter(missingDescription);
  return warnConfigs.map(generateWarning);
};

var _load = require('../../util/load');

function missingDescription(config) {
  return !config.Description;
}

function generateWarning(config) {
  return {
    rule: 'missing-description',
    message: `Function ${config.FunctionName} has no description set`
  };
}
module.exports = exports['default'];