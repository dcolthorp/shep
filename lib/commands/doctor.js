'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = undefined;
exports.builder = builder;

var _doctor = require('../doctor');

var _doctor2 = _interopRequireDefault(_doctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'doctor';
var desc = exports.desc = 'Checks your projects against best standards';
function builder(yargs) {
  return yargs.describe('quiet', 'Don\'t log anything').describe('verbose', 'Logs additional information').default('quiet', false).alias('q', 'quiet').example('shep doctor', 'Runs the doctor on your project');
}

var handler = exports.handler = _doctor2.default;