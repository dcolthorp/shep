'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var accountId = opts.accountId;
  var path = opts.path;
  var method = opts.method;

  if (!accountId) {
    throw new Error('Unable to determine your AWS Account ID. Please set it in the `shep` section of package.json');
  }

  var api = load.api() || {};

  var name = `${path} ${method}`;

  var _genName = (0, _generateName2.default)(name),
      shortName = _genName.shortName,
      fullName = _genName.fullName;

  var tasks = (0, _listr2.default)([{
    title: `Generate Function ${shortName}`,
    task: function task() {
      return (0, _generateFunction2.default)({ name, quiet: true });
    }
  }, {
    title: 'Setup Endpoint',
    task: function task() {
      return addPath(api, path, method, accountId, fullName);
    }
  }, {
    title: 'Setup CORS',
    task: function task() {
      return setupCORS(api, path);
    }
  }, {
    title: 'Write api.json',
    task: function task() {
      return (0, _fs.writeJSON)('api.json', api, { spaces: 2 });
    }
  }], opts.quiet);

  return tasks.run();
};

var _generateFunction = require('../generate-function');

var _generateFunction2 = _interopRequireDefault(_generateFunction);

var _fs = require('../util/modules/fs');

var _templates = require('./templates');

var _generateName = require('../util/generate-name');

var _generateName2 = _interopRequireDefault(_generateName);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var integration = 'x-amazon-apigateway-integration';

function addPath(api, path, method, accountId, functionName) {
  if (method === 'any') {
    method = 'x-amazon-apigateway-any-method';
  }

  if (!api.paths) {
    api.paths = {};
  }

  api.paths[path] = api.paths[path] || {};
  if (api.paths[path][method] !== undefined) {
    throw new Error(`Method '${method}' on path '${path}' already exists`);
  }
  api.paths[path][method] = api.paths[path][method] || {};
  api.paths[path][method][integration] = {
    uri: `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:${accountId}:function:${functionName}:\${stageVariables.functionAlias}/invocations`,
    passthroughBehavior: 'when_no_match',
    httpMethod: 'POST',
    type: 'aws_proxy'
  };
}

function setupCORS(api, path) {
  api.paths[path].options = api.paths[path].options || _templates.cors;
}
module.exports = exports['default'];