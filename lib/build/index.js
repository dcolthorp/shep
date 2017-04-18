'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var functions = opts.functions || '*';
  var env = opts.env || 'development';

  var tasks = (0, _listr2.default)([{
    title: `Build Functions`,
    task: function task() {
      return (0, _buildFunctions2.default)(functions, env);
    }
  }], opts.quiet);

  return tasks.run();
};

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

var _buildFunctions = require('../util/build-functions');

var _buildFunctions2 = _interopRequireDefault(_buildFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];