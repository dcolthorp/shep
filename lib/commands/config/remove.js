'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;

var _bluebird = require('bluebird');

var handler = exports.handler = function () {
  var _ref = (0, _bluebird.coroutine)(function* (opts) {
    var envs = yield load.envs();

    if (envs && envs.length > 0) {
      var questions = [{
        name: 'env',
        message: 'Environment',
        type: 'list',
        choices: function choices() {
          return envs;
        }
      }];

      _inquirer2.default.prompt(questions.filter(function (q) {
        return !opts[q.name];
      })).then(function (inputs) {
        return (0, _lodash2.default)({}, inputs, opts);
      }).then(_configRemove2.default);
    } else {
      if (!opts.env) {
        console.log('no API found, cannot load available aliases');
      }

      (0, _configRemove2.default)(opts);
    }
  });

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.builder = builder;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _configRemove = require('../../config-remove');

var _configRemove2 = _interopRequireDefault(_configRemove);

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'remove <env> <vars...>';
var desc = exports.desc = 'Remove environment variables for alias on AWS';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).example('shep config remove beta NEW_VARIABLE', 'Removes NEW_VARIABLE from all functions with beta alias');
}