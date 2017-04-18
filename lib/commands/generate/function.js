'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desc = exports.command = undefined;
exports.builder = builder;
exports.handler = handler;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _generateFunction = require('../../generate-function');

var _generateFunction2 = _interopRequireDefault(_generateFunction);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = [{
  name: 'name',
  type: 'input',
  message: 'Function name'
}];

var command = exports.command = 'function [name]';
var desc = exports.desc = 'Generate a new function';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('name', 'Function name').describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet').example('shep generate function', 'Launch an interactive CLI').example('shep generate function foo', 'Genereate a new functon called "foo"');
}

function handler(opts) {
  _inquirer2.default.prompt(questions.filter(function (q) {
    return !opts[q.name];
  })).then(function (inputs) {
    return (0, _lodash2.default)({}, inputs, opts);
  }).then(_generateFunction2.default);
}