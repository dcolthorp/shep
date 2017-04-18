'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funcs = exports.envs = undefined;

var _bluebird = require('bluebird');

var envs = exports.envs = function () {
  var _ref = (0, _bluebird.coroutine)(function* () {
    var api = this.api();
    if (api && api.id) {
      return (0, _apiGateway.aliases)(api.id);
    } else {
      return [];
    }
  });

  return function envs() {
    return _ref.apply(this, arguments);
  };
}();

var funcs = exports.funcs = function () {
  var _ref2 = (0, _bluebird.coroutine)(function* () {
    var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

    var funcs = (0, _fs.readdirSync)('functions').filter(_minimatch2.default.filter(pattern));
    if (funcs.length === 0) {
      throw new Error(`No functions found matching patterns: ${JSON.stringify(funcs)}`);
    } else {
      return funcs;
    }
  });

  return function funcs() {
    return _ref2.apply(this, arguments);
  };
}();

exports.events = events;
exports.lambdaConfig = lambdaConfig;
exports.pkg = pkg;
exports.api = api;
exports.babelrc = babelrc;

var _fs = require('./modules/fs');

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _apiGateway = require('./aws/api-gateway');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function events(func, eventName) {
  var eventDir = `functions/${func}/events`;
  var events = (0, _fs.readdirSync)(`functions/${func}/events`);
  if (eventName) {
    events = events.filter(function (event) {
      return event === `${eventName}.json`;
    });
    if (events.length === 0) {
      throw new Error(`No event in '${eventDir}' called ${eventName}`);
    }
  }

  return events;
}

function lambdaConfig(name) {
  var functionConfig = (0, _fs.readJSONSync)(`functions/${name}/lambda.json`);
  var projectConfig = (0, _fs.readJSONSync)(`lambda.json`);

  return Object.assign(projectConfig, functionConfig);
}

function pkg() {
  return (0, _fs.readJSONSync)('package.json');
}

function api() {
  try {
    return (0, _fs.readJSONSync)('api.json');
  } catch (e) {
    return null;
  }
}

function babelrc() {
  return (0, _fs.readJSONSync)('.babelrc');
}