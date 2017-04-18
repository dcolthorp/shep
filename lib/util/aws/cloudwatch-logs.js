'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogGroup = getLogGroup;
exports.getLogStreams = getLogStreams;
exports.getLogEvents = getLogEvents;

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLogGroup(_ref) {
  var functionName = _ref.functionName;

  var cwLogs = new _2.default.CloudWatchLogs();
  var expetedName = `/aws/lambda/${functionName}`;

  var params = {
    logGroupNamePrefix: expetedName
  };

  return cwLogs.describeLogGroups(params).promise().get('logGroups').then(function (groups) {
    return groups.filter(function (logGroup) {
      return logGroup.logGroupName === expetedName;
    });
  }).get(0).get('logGroupName').catch(function (e) {
    return Promise.reject({ code: 'ResourceNotFoundException',
      message: 'No log groups found for specified function' });
  });
}

function getLogStreams(_ref2) {
  var logGroupName = _ref2.logGroupName,
      functionVersion = _ref2.functionVersion;

  var cwLogs = new _2.default.CloudWatchLogs();
  var versionRegExp = new RegExp(`\\[${functionVersion}\\]`);

  // LastEventTime isn't always accurate
  var params = {
    logGroupName,
    orderBy: 'LastEventTime',
    descending: true
  };

  return cwLogs.describeLogStreams(params).promise().get('logStreams').filter(function (stream) {
    return versionRegExp.test(stream.logStreamName);
  }).map(function (x) {
    return x.logStreamName;
  });
}

function getLogEvents(_ref3) {
  var logGroupName = _ref3.logGroupName,
      logStreamNames = _ref3.logStreamNames,
      start = _ref3.start,
      end = _ref3.end;

  var cwLogs = new _2.default.CloudWatchLogs();

  var params = {
    logGroupName,
    logStreamNames,
    startTime: start,
    endTime: end,
    interleaved: true
  };

  return cwLogs.filterLogEvents(params).promise().get('events');
}