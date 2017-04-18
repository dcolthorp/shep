'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var env = opts.env || 'development';

  _awsSdk2.default.config.update({ region: opts.region });

  var tasks = (0, _listr2.default)([{
    title: 'Set environment variables on functions in AWS',
    task: function task() {
      return (0, _uploadEnvironment2.default)(env, opts.vars);
    }
  }]);

  return tasks.run();
};

var _uploadEnvironment = require('../util/upload-environment');

var _uploadEnvironment2 = _interopRequireDefault(_uploadEnvironment);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];