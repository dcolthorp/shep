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
        name: 'stage',
        message: 'Stage',
        type: 'list',
        choices: function choices() {
          return envs;
        }
      }, {
        name: 'name',
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
        name: 'name',
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
    }).then(_logs2.default);
  });

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.builder = builder;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _logs = require('../logs');

var _logs2 = _interopRequireDefault(_logs);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'logs [stage] [name]';
var desc = exports.desc = 'Streams logs from the specified version of a function';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('stage', 'Name of stage to use').describe('name', 'Name of function to use').describe('region', 'Name of region to use, uses region in `package.json` if not given').boolean('stream', 'Stream logs').default('stream', true).example('shep logs', 'Launch an interactive CLI').example('shep logs production foo', 'Shows logs for the `foo` function in the production environment');
}