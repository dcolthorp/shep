'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;

var _push = require('../push');

Object.defineProperty(exports, 'handler', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_push).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'push';
var desc = exports.desc = 'Create a new shep project';
function builder(yargs) {
  return yargs.pkgConf('shep', process.cwd()).describe('api-id', 'API Gateway resource id. Read from package.json if not provided').require('api-id').describe('region', 'AWS region. Read from package.json if not provided').require('region').describe('quiet', 'Don\'t log anything').default('quiet', false).alias('q', 'quiet').example('shep push', 'Pushes the api.json swagger configuration to API Gateway. Does not deploy the API.').example('shep push --api-id foo --region us-east-1');
}