'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putFunction = putFunction;
exports.putEnvironment = putEnvironment;
exports.removeEnvVars = removeEnvVars;
exports.getEnvironment = getEnvironment;
exports.getAliasVersion = getAliasVersion;
exports.setAlias = setAlias;
exports.setPermission = setPermission;

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function putFunction(env, config, ZipFile) {
  var lambda = new _2.default.Lambda();

  validateConfig(config);

  var FunctionName = config.FunctionName;
  var Publish = true;

  return lambda.getFunction({ FunctionName }).promise().then(putEnvironment(env, config)).then(function () {
    return lambda.updateFunctionCode({ ZipFile, FunctionName, Publish }).promise();
  }).catch({ code: 'ResourceNotFoundException' }, function () {
    var params = (0, _lodash2.default)(config, { Publish, Code: { ZipFile } });
    return lambda.createFunction(params).promise();
  });
}

function putEnvironment(env, config, envVars) {
  var lambda = new _2.default.Lambda();

  validateConfig(config);

  var params = {
    FunctionName: config.FunctionName,
    Qualifier: env
  };

  return lambda.getFunction(params).promise().then(function (awsFunction) {
    var envMap = mergeExistingEnv(awsFunction, envVars);
    var lambdaConfig = (0, _lodash2.default)(config, { Environment: { Variables: envMap } });
    return lambda.updateFunctionConfiguration(lambdaConfig).promise();
  }).then(function (_ref) {
    var FunctionName = _ref.FunctionName;

    return lambda.publishVersion({ FunctionName }).promise();
  }).then(function (func) {
    setAlias(func, env);
  }).catch(function (e) {
    throw new Error(e);
  });
}

function removeEnvVars(env, config, envVars) {
  var lambda = new _2.default.Lambda();

  validateConfig(config);

  var params = {
    FunctionName: config.FunctionName,
    Qualifier: env
  };

  return lambda.getFunction(params).promise().then(function (awsFunction) {
    var envMap = deleteEnvVars(awsFunction, envVars);
    var lambdaConfig = (0, _lodash2.default)(config, { Environment: { Variables: envMap } });
    return lambda.updateFunctionConfiguration(lambdaConfig).promise();
  }).then(function (_ref2) {
    var FunctionName = _ref2.FunctionName;

    return lambda.publishVersion({ FunctionName }).promise();
  }).then(function (func) {
    setAlias(func, env);
  }).catch(function (e) {
    throw new Error(e);
  });
}

function getEnvironment(env, _ref3) {
  var FunctionName = _ref3.FunctionName;

  var lambda = new _2.default.Lambda();

  var params = {
    FunctionName,
    Qualifier: env
  };

  return lambda.getFunction(params).promise().get('Configuration').get('Environment').get('Variables').catch(function (e) {
    throw new Error(`No environment variables exist for ${FunctionName}`);
  });
}

function getAliasVersion(_ref4) {
  var functionName = _ref4.functionName,
      aliasName = _ref4.aliasName;

  var lambda = new _2.default.Lambda();

  var params = {
    FunctionName: functionName,
    Name: aliasName
  };

  return lambda.getAlias(params).promise().get('FunctionVersion');
}

function setAlias(_ref5, Name) {
  var Version = _ref5.Version,
      FunctionName = _ref5.FunctionName;

  var lambda = new _2.default.Lambda();

  var params = {
    FunctionName,
    Name
  };

  return lambda.getAlias(params).promise().then(function () {
    params.FunctionVersion = Version;
    return lambda.updateAlias(params).promise();
  }).catch({ code: 'ResourceNotFoundException' }, function () {
    params.FunctionVersion = Version;
    return lambda.createAlias(params).promise();
  });
}

function setPermission(_ref6) {
  var name = _ref6.name,
      region = _ref6.region,
      env = _ref6.env,
      apiId = _ref6.apiId,
      accountId = _ref6.accountId;

  var lambda = new _2.default.Lambda();

  var params = {
    Action: 'lambda:InvokeFunction',
    Qualifier: env,
    FunctionName: name,
    Principal: 'apigateway.amazonaws.com',
    StatementId: `api-gateway-${apiId}`,
    SourceArn: `arn:aws:execute-api:${region}:${accountId}:${apiId}/*`
  };

  return lambda.addPermission(params).promise().catch(function (err) {
    // Swallow errors if permission already exists
    if (err.code !== 'ResourceConflictException') {
      throw err;
    }
  });
}

function validateConfig(config) {
  if (!config.Role) {
    throw new Error('You need to specify a valid Role for your lambda functions. See the shep README for details.');
  }
}

function mergeExistingEnv(awsFunction) {
  var envVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (awsFunction.Configuration.Environment) {
    return (0, _lodash2.default)(awsFunction.Configuration.Environment.Variables, envVars);
  } else {
    return envVars;
  }
}

function deleteEnvVars(awsFunction, envVars) {
  envVars.forEach(function (envVar) {
    try {
      delete awsFunction.Configuration.Environment.Variables[envVar];
    } catch (e) {
      throw new Error(`Variable ${envVar} does not exist on AWS`);
    }
  });
  return awsFunction.Configuration.Environment.Variables;
}