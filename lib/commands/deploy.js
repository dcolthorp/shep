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
      }).then(_deploy2.default);
    } else {
      if (!opts.env) {
        console.log('no API found, cannot load available aliases');
      }

      (0, _deploy2.default)(opts);
    }
  });

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.builder = builder;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _deploy = require('../deploy');

var _deploy2 = _interopRequireDefault(_deploy);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'deploy [env] [functions]';
var desc = exports.desc = 'Deploy both functions and APIs to AWS. Will create a new API if the ID is not specified';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('build', 'Build functions before deployment. Use --no-build to skip this step').default('build', true).describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet').example('shep deploy', 'Launch an interactive CLI').example('shep deploy production', 'Deploy all functions with production env variables').example('shep deploy beta --no-build', 'Deploy all functions as currently built in the dist folder').example('shep deploy production create-user', 'Deploy only the create-user function').example('shep deploy beta *-user', 'Deploy only functions matching the pattern *-user');
}