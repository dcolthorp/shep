'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path) {
  return new _bluebird2.default(function (resolve, reject) {
    var archive = _archiver2.default.create('zip');
    var output = new _streamBuffers2.default.WritableStreamBuffer();

    output.on('finish', function () {
      resolve(output.getContents());
    });
    archive.on('error', function (err) {
      reject(err);
    });
    archive.pipe(output);
    archive.directory(path, '/').finalize();
  });
};

var _archiver = require('archiver');

var _archiver2 = _interopRequireDefault(_archiver);

var _streamBuffers = require('stream-buffers');

var _streamBuffers2 = _interopRequireDefault(_streamBuffers);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];