'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;

var _bluebird = require('bluebird');

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var handler = exports.handler = function () {
  var _ref = (0, _bluebird.coroutine)(function* (opts) {
    var envVars = {};
    opts.vars.forEach(function (varPair) {
      var _varPair$match$slice = varPair.match(/(.*?)=(.*)/).slice(1),
          _varPair$match$slice2 = _slicedToArray(_varPair$match$slice, 2),
          key = _varPair$match$slice2[0],
          value = _varPair$match$slice2[1];

      envVars[key] = value;
    });
    opts.vars = envVars;

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
      }).then(_configSet2.default);
    } else {
      if (!opts.env) {
        console.log('no API found, cannot load available aliases');
      }

      (0, _configSet2.default)(opts);
    }
  });

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.builder = builder;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _configSet = require('../../config-set');

var _configSet2 = _interopRequireDefault(_configSet);

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'set <env> <vars...>';
var desc = exports.desc = 'Set environment variables for alias on AWS';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).example('shep config set beta FOO=bar', 'Set environment variable FOO with value BAR for alias beta');
}