'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _fs = require('../util/modules/fs');

var _iam = require('../util/aws/iam');

var _templates = require('./templates');

var templates = _interopRequireWildcard(_templates);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _exec = require('../util/modules/exec');

var _exec2 = _interopRequireDefault(_exec);

var _listr = require('../util/modules/listr');

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function run(opts) {
  var path = opts.path;
  var rolename = opts.rolename;
  var region = opts.region;

  var tasks = [{
    title: `Setup IAM Role`,
    task: setupIam
  }, {
    title: `Create ${path}/`,
    task: function task() {
      return (0, _fs.mkdirp)(path);
    }
  }, {
    title: 'Create Subdirectories',
    task: createSubDirs
  }, {
    title: 'Create Files',
    task: createFiles
  }, {
    title: 'Install Depedencies',
    task: npmInstall
  }];

  if (!rolename) tasks = tasks.splice(1);

  return (0, _listr2.default)(tasks, opts.quiet).run({ path, rolename, region });
}

function setupIam(context) {
  var rolename = context.rolename;
  var newRole = false;

  return (0, _iam.getRole)(rolename).catch({ code: 'NoSuchEntity' }, function () {
    newRole = true;
    return (0, _iam.createRole)(rolename);
  }).tap(function (arn) {
    context.arn = arn;
  }).then(function () {
    if (newRole) return (0, _iam.attachPolicy)(rolename);
  }).catch({ code: 'LimitExceeded' }, function () {
    return _bluebird2.default.reject('Current AWS User does not have sufficient permissions to do this');
  });
}

function createSubDirs(_ref) {
  var path = _ref.path;

  return _bluebird2.default.all([(0, _fs.mkdirp)(path + '/functions')]);
}

function createFiles(_ref2) {
  var path = _ref2.path,
      arn = _ref2.arn,
      region = _ref2.region;

  var accountId = (/[0-9]{12}(?=:)/.exec(arn) || [''])[0];

  return _bluebird2.default.all([(0, _fs.writeFile)(path + '/package.json', templates.pkg({ apiName: path, region, accountId })), (0, _fs.writeFile)(path + '/.gitignore', templates.gitignore()), (0, _fs.writeFile)(path + '/.env', templates.dotEnv()), (0, _fs.writeFile)(path + '/README.md', templates.readme(path)), (0, _fs.writeFile)(path + '/lambda.json', templates.lambda(arn)), (0, _fs.writeFile)(path + '/api.json', templates.api(path)), (0, _fs.writeFile)(path + '/webpack.config.js', templates.webpack()), (0, _fs.writeFile)(path + '/.babelrc', templates.babelrc())]);
}

function npmInstall(_ref3) {
  var path = _ref3.path;

  return (0, _exec2.default)('npm install', { cwd: path });
}
module.exports = exports['default'];