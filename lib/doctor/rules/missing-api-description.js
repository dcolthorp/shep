'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var api = load.api();
  if (!api || api.info.description) {
    return [];
  }

  return [{
    rule: 'missing-api-description',
    message: 'api.json has no description in the info object'
  }];
};

var _load = require('../../util/load');

var load = _interopRequireWildcard(_load);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];