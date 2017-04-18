'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api, id, env) {
  var promises = [];
  Object.keys(api.paths).map(function (path) {
    Object.keys(api.paths[path]).map(function (method) {
      var uri = api.paths[path][method]['x-amazon-apigateway-integration'].uri;
      if (uri && uri.includes('aws:lambda')) {
        var uriParts = uri.split(':');
        var isQualified = uriParts[11].indexOf('/invocations') === -1;
        promises.push((0, _lambda.setPermission)({
          env: isQualified ? env : undefined,
          region: uriParts[8],
          accountId: uriParts[9],
          apiId: id,
          name: uriParts[11].replace(/\/invocations/, '')
        }));
      }
    });
  });

  return _bluebird2.default.all(promises);
};

var _lambda = require('./aws/lambda');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];