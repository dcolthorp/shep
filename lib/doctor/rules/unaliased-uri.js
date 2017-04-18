'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var parsedApi = (0, _parseApi2.default)(load.api());
  var unaliasedEndpoints = parsedApi.filter(hasNoAlias);

  return unaliasedEndpoints.map(generateWarnings);
};

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _parseApi = require('../../util/parse-api');

var _parseApi2 = _interopRequireDefault(_parseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hasNoAlias(_ref) {
  var integration = _ref.integration;

  var uri = integration.uri;
  var aliasString = '${stageVariables.functionAlias}'; // eslint-disable-line no-template-curly-in-string

  return uri && uri.indexOf(aliasString) === -1;
}

function generateWarnings(_ref2) {
  var path = _ref2.path,
      method = _ref2.method;

  return {
    rule: 'unaliased-uri',
    type: 'error',
    message: `The integration of ${path} ${method.toUpperCase()} isn't aliased.`
  };
}
module.exports = exports['default'];