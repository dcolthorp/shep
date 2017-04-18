'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;
var command = exports.command = 'generate';
var desc = exports.desc = 'Run `shep generate --help` for additional information';
function builder(yargs) {
  return yargs.commandDir('./generate').demand(1).strict();
}