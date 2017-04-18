'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  _awsSdk2.default.config.update({ region: opts.region });

  var apiId = opts.apiId;
  var region = opts.region;
  var api = load.api();

  var tasks = (0, _listr2.default)([{
    title: `Upload api.json to AWS`,
    task: function task() {
      return (0, _pushApi2.default)(api, apiId, region);
    }
  }], opts.quiet);

  return tasks.run();
};

var _pushApi = require('../util/push-api');

var _pushApi2 = _interopRequireDefault(_pushApi);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];