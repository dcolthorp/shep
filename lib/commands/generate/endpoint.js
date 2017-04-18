'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desc = exports.command = undefined;
exports.builder = builder;
exports.handler = handler;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _generateEndpoint = require('../../generate-endpoint');

var _generateEndpoint2 = _interopRequireDefault(_generateEndpoint);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpMethods = ['get', 'post', 'put', 'delete', 'options', 'any'];

var command = exports.command = 'endpoint [path]';
var desc = exports.desc = 'Generate a new API endpoint';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('method', 'HTTP Method').choices('method', httpMethods).describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet');
}

function handler(opts) {
  var questions = [{
    name: 'path',
    type: 'input',
    message: 'Endpoint path',
    default: '/users/{id}',
    validate: function validate(val) {
      return val === '' ? 'Path cannot be blank' : true;
    }
  }, {
    name: 'method',
    type: 'list',
    message: 'HTTP method',
    choices: httpMethods
  }];

  _inquirer2.default.prompt(questions.filter(function (q) {
    return !opts[q.name];
  })).then(function (inputs) {
    return (0, _lodash2.default)({}, inputs, opts);
  }).then(_generateEndpoint2.default);
}