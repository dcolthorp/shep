'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLogs;

var _cloudwatchLogs = require('./aws/cloudwatch-logs');

function getLogs(_ref) {
  var logGroupName = _ref.logGroupName,
      functionVersion = _ref.functionVersion,
      stream = _ref.stream,
      _ref$start = _ref.start,
      start = _ref$start === undefined ? Date.now() : _ref$start;

  var recievedEvents = void 0;

  return (0, _cloudwatchLogs.getLogStreams)({ logGroupName, functionVersion }).then(function (logStreamNames) {
    return (0, _cloudwatchLogs.getLogEvents)({ logGroupName, logStreamNames, start });
  }).tap(function (events) {
    recievedEvents = events;
  }).reduce(maxTimestamp, start).then(function (timestamp) {
    return timestamp === start ? timestamp : timestamp + 1;
  }) // If timestamp from new event, increase start time to avoid duplicate events
  .then(function (lastTimestamp) {
    return Promise.resolve({
      events: recievedEvents,
      nextLogCall: tailCallGenerator({ logGroupName, functionVersion, stream, lastTimestamp })
    });
  });
}

function tailCallGenerator(_ref2) {
  var logGroupName = _ref2.logGroupName,
      functionVersion = _ref2.functionVersion,
      stream = _ref2.stream,
      lastTimestamp = _ref2.lastTimestamp;

  if (stream) {
    return function () {
      return getLogs({ logGroupName, functionVersion, stream, start: lastTimestamp });
    };
  }
  return function () {
    return Promise.resolve({});
  };
}

function maxTimestamp(latest, event) {
  return Math.max(latest, event.timestamp);
}
module.exports = exports['default'];