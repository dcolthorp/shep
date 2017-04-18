'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportStage = exportStage;
exports.deploy = deploy;
exports.pushApi = pushApi;
exports.aliases = aliases;

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exportStage(restApiId, stageName) {
  var apiGateway = new _2.default.APIGateway();
  var params = {
    restApiId,
    stageName,
    exportType: 'swagger',
    accepts: 'json',
    parameters: {
      extensions: 'integrations,authorizers'
    }
  };

  return apiGateway.getExport(params).promise().get('body');
}

function deploy(id, env) {
  var apiGateway = new _2.default.APIGateway();
  return apiGateway.createDeployment({ restApiId: id, stageName: env, variables: { functionAlias: env } }).promise();
}

function pushApi(api, id) {
  var apiGateway = new _2.default.APIGateway();

  var params = {
    body: JSON.stringify(api),
    failOnWarnings: true
  };

  if (id) {
    params.mode = 'overwrite';
    params.restApiId = id;
    return apiGateway.putRestApi(params).promise().get('id');
  } else {
    return apiGateway.importRestApi(params).promise().get('id');
  }
}

function aliases(id) {
  var apiGateway = new _2.default.APIGateway();

  var params = {
    restApiId: id
  };

  return apiGateway.getStages(params).promise();
}