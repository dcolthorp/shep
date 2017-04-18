'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var functionName = (0, _generateName2.default)(opts.name).fullName;
  var aliasName = opts.stage;
  var stream = opts.stream;
  var region = opts.region || (0, _load.pkg)().shep.region;

  _aws2.default.config.update({ region });

  return _bluebird2.default.join((0, _cloudwatchLogs.getLogGroup)({ functionName }), (0, _lambda.getAliasVersion)({ functionName, aliasName }), function (logGroupName, functionVersion) {
    return (0, _getLogs2.default)({ logGroupName, functionVersion, stream });
  }).then(printEventsLoop);
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _aws = require('../util/aws');

var _aws2 = _interopRequireDefault(_aws);

var _cloudwatchLogs = require('../util/aws/cloudwatch-logs');

var _lambda = require('../util/aws/lambda');

var _getLogs = require('../util/get-logs');

var _getLogs2 = _interopRequireDefault(_getLogs);

var _load = require('../util/load');

var _generateName = require('../util/generate-name');

var _generateName2 = _interopRequireDefault(_generateName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printEventsLoop(_ref) {
  var events = _ref.events,
      nextLogCall = _ref.nextLogCall;

  var rate = 500;

  if (events !== undefined && events.length !== 0) {
    console.log(events.map(formatEvent).join(''));
  }

  if (nextLogCall === undefined) {
    return _bluebird2.default.resolve();
  }

  return _bluebird2.default.delay(rate).then(nextLogCall).then(printEventsLoop);
}

function formatEvent(_ref2) {
  var timestamp = _ref2.timestamp,
      message = _ref2.message;

  return `[${new Date(timestamp).toTimeString()}]: ${message}`;
}
module.exports = exports['default'];