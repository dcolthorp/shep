'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var _genName = (0, _generateName2.default)(opts.name),
      shortName = _genName.shortName,
      fullName = _genName.fullName;

  var tasks = (0, _listr2.default)([{
    title: `Create functions/${shortName}/`,
    task: function task() {
      return (0, _fs.mkdirp)(`./functions/${shortName}`);
    }
  }, {
    title: `Create functions/${shortName}/events`,
    task: function task() {
      return (0, _fs.mkdirp)(`./functions/${shortName}/events`);
    }
  }, {
    title: 'Create files',
    task: function task() {
      return createFiles(shortName);
    }
  }], opts.quiet);

  return tasks.run();

  function createFiles() {
    return _bluebird2.default.all([(0, _fs.writeFile)(`./functions/${shortName}/index.js`, templates.index()), (0, _fs.writeFile)(`./functions/${shortName}/lambda.json`, templates.lambda(fullName)), (0, _fs.writeFile)(`./functions/${shortName}/events/default.json`, templates.event())]);
  }
};

var _fs = require('../util/modules/fs');

var _generateName = require('../util/generate-name');

var _generateName2 = _interopRequireDefault(_generateName);

var _templates = require('./templates');

var templates = _interopRequireWildcard(_templates);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];