'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var api = load.api();
  if (!api) {
    return [];
  }

  var funcNames = load.funcs('*');
  var parsedApi = (0, _parseApi2.default)(api);
  var unreferencedFunctions = funcNames.filter(function (funcName) {
    return !parsedApi.some(function (_ref) {
      var integration = _ref.integration;
      return isFuncInUri(funcName, integration.uri);
    });
  });

  return unreferencedFunctions.map(generateWarning);
};

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

var _parseApi = require('../../util/parse-api');

var _parseApi2 = _interopRequireDefault(_parseApi);

var _generateName = require('../../util/generate-name');

var _generateName2 = _interopRequireDefault(_generateName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function isFuncInUri(funcName, uri) {
  if (uri === undefined) {
    return false;
  }
  var funcRegExp = new RegExp(`:${(0, _generateName2.default)(funcName).fullName}:`);
  return funcRegExp.test(uri);
}

function generateWarning(funcName) {
  return {
    rule: 'unreferenced-functions',
    message: `Function ${funcName} isn't referenced by api.json`
  };
}
module.exports = exports['default'];