'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;

var _bluebird = require('bluebird');

var handler = exports.handler = function () {
  var _ref = (0, _bluebird.coroutine)(function* (opts) {
    var envs = yield load.envs();
    var questions = void 0;

    if (envs && envs.length > 0) {
      questions = [{
        name: 'env',
        message: 'Environment',
        type: 'list',
        choices: function choices() {
          return envs;
        }
      }, {
        name: 'function',
        message: 'Function',
        type: 'list',
        choices: function choices() {
          return load.funcs();
        }
      }];
    } else {
      if (!opts.env) {
        console.log('no API found, cannot load available aliases');
      }
      questions = [{
        name: 'function',
        message: 'Function',
        type: 'list',
        choices: function choices() {
          return load.funcs();
        }
      }];
    }

    _inquirer2.default.prompt(questions.filter(function (q) {
      return !opts[q.name];
    })).then(function (inputs) {
      return (0, _lodash2.default)({}, inputs, opts);
    }).then(_configList2.default);
  });

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.builder = builder;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _configList = require('../../config-list');

var _configList2 = _interopRequireDefault(_configList);

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'list [env] [function]';
var desc = exports.desc = 'List environment variables on AWS for an alias';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).example('shep config beta foo', 'List environment variables for function "foo" beta alias');
}