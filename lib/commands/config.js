'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;
var command = exports.command = 'config';
var desc = exports.desc = 'Run `shep config --help` for additional information';
function builder(yargs) {
  return yargs.commandDir('./config').demand(1).strict();
}