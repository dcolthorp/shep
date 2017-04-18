'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readdir = exports.readdirSync = exports.readJSONSync = exports.readJSON = exports.writeJSON = exports.writeFile = exports.readFile = exports.mkdirp = undefined;

var _fsExtraPromise = require('fs-extra-promise');

var _fsExtraPromise2 = _interopRequireDefault(_fsExtraPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mkdirp = exports.mkdirp = _fsExtraPromise2.default.mkdirpAsync;
var readFile = exports.readFile = _fsExtraPromise2.default.readFileAsync;
var writeFile = exports.writeFile = _fsExtraPromise2.default.writeFileAsync;
var writeJSON = exports.writeJSON = _fsExtraPromise2.default.writeJSONAsync;
var readJSON = exports.readJSON = _fsExtraPromise2.default.readJSONAsync;
var readJSONSync = exports.readJSONSync = _fsExtraPromise2.default.readJSONSync;
var readdirSync = exports.readdirSync = _fsExtraPromise2.default.readdirSync;
var readdir = exports.readdir = _fsExtraPromise2.default.readdirAsync;