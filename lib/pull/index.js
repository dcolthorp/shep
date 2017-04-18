'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var apiId = opts.apiId;
  var stage = opts.stage;
  var region = opts.region;

  _awsSdk2.default.config.update({ region: opts.region });

  var exportedApi = void 0;

  var tasks = (0, _listr2.default)([{
    title: `Export API currenly on ${stage}`,
    task: function task() {
      return (0, _apiGateway.exportStage)(apiId, stage).tap(function (api) {
        exportedApi = api;
      }).tap(function () {
        return (0, _pkgConfig.update)({ apiId, region });
      });
    }
  }, {
    title: 'Write to api.json',
    task: function task() {
      return (0, _fs.writeFile)('api.json', exportedApi, { spaces: 2 });
    }
  }], opts.quiet);

  return tasks.run();
};

var _fs = require('../util/modules/fs');

var _apiGateway = require('../util/aws/api-gateway');

var _pkgConfig = require('../util/pkg-config');

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];