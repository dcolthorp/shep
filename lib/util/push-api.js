'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api, apiId, region) {
  return (0, _apiGateway.pushApi)(api, apiId).tap(function (id) {
    return (0, _pkgConfig.update)({ apiId: id, region });
  });
};

var _apiGateway = require('./aws/api-gateway');

var _pkgConfig = require('./pkg-config');

module.exports = exports['default'];