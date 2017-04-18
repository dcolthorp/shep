'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desc = exports.command = undefined;
exports.builder = builder;
exports.handler = handler;

var _new2 = require('../new');

var _new3 = _interopRequireDefault(_new2);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = [{
  type: 'input',
  name: 'path',
  message: 'Project folder name',
  default: 'my-api'
}, {
  type: 'input',
  name: 'region',
  message: 'Region for project',
  default: 'us-east-1',
  config: true
}, {
  type: 'input',
  name: 'rolename',
  message: 'Enter the name of the IAM role which you wish to use, if it is not found it will be created',
  default: 'shepRole',
  config: true
}];

var command = exports.command = 'new [path]';
var desc = exports.desc = 'Create a new shep project';
function builder(yargs) {
  return yargs.describe('path', 'Location to create the new shep project').boolean('skip-config').describe('skip-config', 'Skips configuring shep project').describe('region', 'Region for new shep project').describe('rolename', 'Name of IAM Role which will be used to execute Lambda functions').describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet').example('shep new', 'Launch an interactive CLI').example('shep new my-api', 'Generates a project at `my-api`');
}

function handler(opts) {
  _inquirer2.default.prompt(questions.filter(function (q) {
    return !opts[q.name] && (!opts.skipConfig || !q.config);
  })).then(function (inputs) {
    return (0, _lodash2.default)({}, inputs, opts);
  }).then(_new3.default);
}