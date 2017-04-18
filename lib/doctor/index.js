'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  var log = logger(opts.verbose);
  var ruleNames = Object.keys(rules).filter(function (name) {
    return name !== 'toString' && name !== 'default';
  });
  var warnings = ruleNames.map(function (name) {
    return rules[name](opts);
  });
  var flatWarnings = warnings.reduce(function (com, a) {
    return com.concat(a);
  }, []);

  if (!opts.quiet) {
    flatWarnings.forEach(log);
  }

  var errors = warnings.filter(function (_ref) {
    var type = _ref.type;
    return type === 'error';
  }).map(function (_ref2) {
    var message = _ref2.message;
    return message;
  });

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(errors.length);
  }

  return flatWarnings;
};

var _rules = require('./rules');

var rules = _interopRequireWildcard(_rules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* eslint import/namespace: ['error', { allowComputed: true }] */
function logger(verbose) {
  return function (_ref3) {
    var rule = _ref3.rule,
        message = _ref3.message;

    if (verbose) {
      console.log(rule);
    }
    console.log(message + '\n');
  };
}
module.exports = exports['default'];