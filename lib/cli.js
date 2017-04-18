'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _loudRejection = require('loud-rejection');

var _loudRejection2 = _interopRequireDefault(_loudRejection);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cli() {
  (0, _loudRejection2.default)();

  _yargs2.default.wrap(120).usage('Usage: $0 <command> [options]').demand(1).commandDir('./commands').version().help().strict().argv;
}
module.exports = exports['default'];