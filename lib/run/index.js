'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _requireProject = require('../util/require-project');

var _requireProject2 = _interopRequireDefault(_requireProject);

var _load = require('../util/load');

var load = _interopRequireWildcard(_load);

var _buildFunctions = require('../util/build-functions');

var _buildFunctions2 = _interopRequireDefault(_buildFunctions);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _awsLambdaMockContext = require('aws-lambda-mock-context');

var _awsLambdaMockContext2 = _interopRequireDefault(_awsLambdaMockContext);

var _cliui = require('cliui');

var _cliui2 = _interopRequireDefault(_cliui);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var ui = (0, _cliui2.default)({ width: 80 });

var results = { success: 'SUCCESS', error: 'ERROR', exception: 'EXCEPTION' };

var awsNodeVersion = ['4.3.2', '6.10.0'];

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(function* (opts) {
    _awsSdk2.default.config.update({ region: opts.region });

    var processVersion = process.versions.node;

    if (awsNodeVersion.indexOf(processVersion) === -1) {
      console.log(`Warning: Lambda currently runs node v${awsNodeVersion} but you are using v${processVersion}`);
    }

    var loggingFunction = logFunction(opts.v);
    var funcRunner = runFunction(opts);
    var names = load.funcs(opts.pattern);

    var out = yield _bluebird2.default.map(names, funcRunner);
    out.map(loggingFunction);
    console.log(ui.toString());

    var failedFunctions = out.reduce(function (count, eventResponse) {
      return count + eventResponse.filter(function (e) {
        return e.error;
      }).length;
    }, 0);

    if (failedFunctions > 0) {
      process.exit(failedFunctions);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function runFunction(opts) {
  return function () {
    var _ref2 = (0, _bluebird.coroutine)(function* (name) {
      var env = opts.environment || 'development';
      var performBuild = opts.build;
      var lambdaConfig = load.lambdaConfig(name);
      var events = load.events(name, opts.event);

      var _lambdaConfig$Handler = lambdaConfig.Handler.split('.'),
          _lambdaConfig$Handler2 = _slicedToArray(_lambdaConfig$Handler, 2),
          fileName = _lambdaConfig$Handler2[0],
          handler = _lambdaConfig$Handler2[1];

      var ctx = (0, _awsLambdaMockContext2.default)();

      performBuild ? yield (0, _buildFunctions2.default)(name, env) : require('babel-register');

      var funcPath = `${performBuild ? 'dist' : 'functions'}/${name}/${fileName}.js`;

      var func = (0, _requireProject2.default)(funcPath)[handler];

      if (typeof func !== 'function') {
        return _bluebird2.default.reject(new Error(`Handler function provided is not a function. Please verify that there exists a handler function exported as ${handler} in dist/${name}/${fileName}.js`));
      }

      return yield _bluebird2.default.map(events, function (eventFilename) {
        var event = (0, _requireProject2.default)(`functions/${name}/events/${eventFilename}`);
        return new _bluebird2.default(function (resolve) {
          var output = { name: eventFilename, funcName: name };
          output.start = new Date();
          try {
            func(event, ctx, function (err, res) {
              output.end = new Date();
              if (err) {
                output.result = results.error;
                output.response = err;
              } else {
                output.result = results.success;
                output.response = res;
              }
              resolve(output);
            });
          } catch (e) {
            output.error = true;
            output.end = new Date();
            output.result = results.exception;
            output.response = e;
            resolve(output);
          }
        });
      });
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}

function logFunction(verbose) {
  return function (functionOutput) {
    ui.div({
      text: functionOutput[0].funcName,
      padding: [1, 0, 0, 0]
    });
    functionOutput.map(function (eventOut) {
      return formatOutput(eventOut, verbose);
    });
  };
}

function formatOutput(output, verbose) {
  ui.div({
    text: output.name,
    width: 20
  }, {
    text: formatResult(output),
    width: 15
  }, {
    text: formatDate(output),
    width: 10
  }, {
    text: verbose ? splitAt(formatResponse(output), ',', 30) : formatResponse(output).slice(0, 30)
  });
}

function formatResponse(_ref3) {
  var result = _ref3.result,
      response = _ref3.response;

  if (response) {
    if (result === results.success) {
      return JSON.stringify(response);
    } else if (result === results.error) {
      return JSON.stringify(response);
    } else if (result === results.exception) {
      return `${response.name} ${response.message}`;
    }
  } else {
    return '';
  }
}

function formatDate(_ref4) {
  var start = _ref4.start,
      end = _ref4.end;

  return `${end - start}ms`;
}

function formatResult(_ref5) {
  var result = _ref5.result;

  if (result === results.success) {
    return _chalk2.default.green(results.success);
  } else if (result === results.error) {
    return _chalk2.default.yellow(results.error);
  } else if (result === results.exception) {
    return _chalk2.default.red(results.exception);
  }
}

function splitAt(str, token, width) {
  return str.split(token).reduce(function (sum, curr) {
    var lastLine = sum.slice(-1)[0];

    if (!lastLine || curr.length > width || lastLine.length + curr.length >= width) {
      sum.push(curr);
    } else {
      sum[sum.length - 1] = [lastLine, curr].join(token);
    }

    return sum;
  }, []);
}
module.exports = exports['default'];