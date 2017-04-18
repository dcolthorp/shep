'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desc = exports.command = undefined;
exports.builder = builder;
exports.handler = handler;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'run [pattern]';
var desc = exports.desc = 'Run a function in your local environemnt';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('environment', 'Environment variables to use').describe('event', 'Event to use').describe('v', 'Responses from functions aren\'t truncated').default('environment', 'development').describe('build', 'Build functions before running. If omitted functions are transpiled by babel on the fly').default('build', false).example('shep run', 'Launch an interactive CLI').example('shep run foo', 'Runs the `foo` function for all events').example('shep run foo --build', 'Builds the `foo` function and then runs it').example('shep run foo --event default', 'Runs the `foo` function for just the `default` event').example('shep run foo --environment production', 'Runs the `foo` function with production environment').example('DB_TABLE=custom shep run foo', 'Runs the `foo` function with process.env.DB_TABLE assigned to custom (vars declared this way will overwrite vals in your .env file)').example('shep run \'*\'', 'Runs all functions for all events').example('shep run \'foo-*\'', 'Runs all functions matching pattern `foo-*`');
}

function handler(opts) {
  var questions = [{
    name: 'pattern',
    message: 'Function',
    type: 'list',
    choices: function choices() {
      return load.funcs();
    }
  }];

  _inquirer2.default.prompt(questions.filter(function (q) {
    return !opts[q.name];
  })).then(function (inputs) {
    return (0, _lodash2.default)({}, inputs, opts);
  }).then(_run2.default);
}