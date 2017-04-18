'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRole = createRole;
exports.getRole = getRole;
exports.attachPolicy = attachPolicy;

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _templates = require('../../new/templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRole(name) {
  var iam = new _2.default.IAM();
  var params = {
    RoleName: name,
    AssumeRolePolicyDocument: (0, _templates.lambdaRole)()
  };

  return iam.createRole(params).promise().get('Role').get('Arn');
}

function getRole(name) {
  var iam = new _2.default.IAM();
  var params = { RoleName: name };

  return iam.getRole(params).promise().get('Role').get('Arn');
}

function attachPolicy(name) {
  var iam = new _2.default.IAM();
  var params = {
    PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    RoleName: name
  };

  return iam.attachRolePolicy(params).promise();
}