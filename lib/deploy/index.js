'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var functions = opts.functions || '*';
  var env = opts.env || 'development';
  var region = opts.region;
  var performBuild = opts.build;
  var api = load.api();

  var apiId = void 0,
      uploadedFuncs = void 0;

  if (opts.apiId) {
    apiId = opts.apiId;
  }

  _awsSdk2.default.config.update({ region });

  var tasks = (0, _listr2.default)([{
    title: `Build Functions`,
    task: function task() {
      return (0, _buildFunctions2.default)(functions, env);
    },
    skip: function skip() {
      if (performBuild === false) {
        return 'Called with --no-build';
      }
    }
  }, {
    title: 'Upload Functions to AWS',
    task: function task() {
      return (0, _uploadFunctions2.default)(functions, env).tap(function (funcs) {
        uploadedFuncs = funcs;
      });
    }
  }], opts.quiet);

  if (api) {
    tasks.add([{
      title: 'Upload API.json',
      task: function task() {
        return (0, _pushApi2.default)(api, apiId, region).tap(function (id) {
          apiId = id;
        });
      }
    }]);
  }

  tasks.add([{
    title: 'Promote Function Aliases',
    task: function task() {
      return (0, _promoteAliases2.default)(uploadedFuncs, env);
    }
  }]);

  if (api) {
    tasks.add([{
      title: 'Setup Lambda Permissions',
      task: function task() {
        return (0, _setPermissions2.default)(api, apiId, env);
      }
    }, {
      title: 'Deploy API',
      task: function task() {
        return (0, _apiGateway.deploy)(apiId, env);
      }
    }]);
  }

  return tasks.run().then(function () {
    if (apiId) {
      console.log(`API URL: https://${apiId}.execute-api.${region}.amazonaws.com/${env}`);
    }
  });
};

var _buildFunctions = require('../util/build-functions');

var _buildFunctions2 = _interopRequireDefault(_buildFunctions);

var _uploadFunctions = require('../util/upload-functions');

var _uploadFunctions2 = _interopRequireDefault(_uploadFunctions);

var _apiGateway = require('../util/aws/api-gateway');

var _promoteAliases = require('../util/promote-aliases');

var _promoteAliases2 = _interopRequireDefault(_promoteAliases);

var _setPermissions = require('../util/set-permissions');

var _setPermissions2 = _interopRequireDefault(_setPermissions);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _pushApi = require('../util/push-api');

var _pushApi2 = _interopRequireDefault(_pushApi);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];