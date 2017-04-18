'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var name = opts.function;
  var env = opts.env || 'development';

  _awsSdk2.default.config.update({ region: opts.region });

  console.log(`Listing environment variables for ${name}...`, '\n');

  (0, _getEnvironment2.default)(env, name).then(function (vars) {
    if (vars && vars.length > 0) {
      var envObj = vars[0];
      Object.keys(envObj).forEach(function (key) {
        console.log(key, '=', envObj[key]);
      });
      console.log('');
    } else {
      console.log(`No environment vars on AWS for ${name}`);
    }
  });
};

var _getEnvironment = require('../util/get-environment');

var _getEnvironment2 = _interopRequireDefault(_getEnvironment);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];