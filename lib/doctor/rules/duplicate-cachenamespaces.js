'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var api = load.api();
  if (!api) {
    return [];
  }

  var parsedApi = (0, _parseApi2.default)(api);

  var partitionedByCache = parsedApi.filter(hasIntegration).reduce(partitionByCache, {});

  var duplicateNamespaces = Object.keys(partitionedByCache).map(function (cacheName) {
    return partitionedByCache[cacheName];
  }).filter(function (partition) {
    return partition.length > 1;
  });

  return duplicateNamespaces.map(generateWarnings);
};

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _parseApi = require('../../util/parse-api');

var _parseApi2 = _interopRequireDefault(_parseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hasIntegration(_ref) {
  var integration = _ref.integration;

  return integration !== undefined;
}

function partitionByCache(acc, endpoint) {
  var currentNamespace = endpoint.integration.cacheNamespace;
  if (currentNamespace === undefined) return acc;
  if (acc[currentNamespace] === undefined) {
    acc[currentNamespace] = [endpoint];
  } else {
    acc[currentNamespace].push(endpoint);
  }
  return acc;
}

function generateWarnings(partition) {
  var nameSpace = partition[0].integration.cacheNamespace;
  var endpoints = partition.map(function (_ref2) {
    var path = _ref2.path,
        method = _ref2.method;

    return `  ${path} ${method.toUpperCase()}`;
  }).join('\n');
  return {
    rule: 'duplicate-cachenamespaces',
    message: `cacheNamespace '${nameSpace}' is shared by the following: \n${endpoints}`
  };
}
module.exports = exports['default'];