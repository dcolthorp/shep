'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = api;
exports.dotEnv = dotEnv;
exports.gitignore = gitignore;
exports.lambda = lambda;
exports.lambdaRole = lambdaRole;
exports.pkg = pkg;
exports.readme = readme;
exports.webpack = webpack;
exports.babelrc = babelrc;
function api(apiName) {
  return `{
  "swagger": "2.0",
  "info": {
    "title": "${apiName}"
  },
  "schemes": [ "https" ],
  "paths": {}
}
`;
}

function dotEnv() {
  return `{
  "ENV": "development",
  "SECRET_KEY": "development-secret-key"
}
`;
}

function gitignore() {
  return `dist
node_modules
.env
`;
}

function lambda() {
  var arn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var obj = {
    Handler: 'index.handler',
    MemorySize: 128,
    Role: arn,
    Timeout: 10,
    Runtime: 'nodejs4.3'
  };

  return JSON.stringify(obj, null, 2) + '\n';
}

function lambdaRole() {
  return `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;
}

function pkg(_ref) {
  var apiName = _ref.apiName,
      _ref$accountId = _ref.accountId,
      accountId = _ref$accountId === undefined ? '' : _ref$accountId,
      _ref$region = _ref.region,
      region = _ref$region === undefined ? '' : _ref$region;

  var version = require('../index').version;
  var obj = {
    name: apiName,
    version: '1.0.0',
    private: true,
    description: '',
    license: '',
    devDependencies: {
      webpack: '2.2.0',
      minimatch: '3.0.3',
      'babel-core': '6.21.0',
      'babel-preset-env': '1.1.8',
      'babel-loader': '6.2.10',
      shep: version
    },
    shep: {
      region: region,
      accountId: accountId,
      apiId: '',
      buildCommand: ''
    }
  };

  return JSON.stringify(obj, null, 2) + '\n';
}

function readme(apiName) {
  return `# ${apiName}
`;
}

function webpack() {
  return `/*
 * WARNING: Tampering with how entry is populated could affect pattern matching
 */

const fs = require('fs')
const path = require('path')
const minimatch = require('minimatch')

const env = process.env.NODE_ENV || 'development'
const pattern = process.env.PATTERN || '*'

const entry = fs.readdirSync('functions')
  .filter(minimatch.filter(pattern))
  .reduce((map, funcName) => {
    map[funcName] = path.resolve(\`functions/\${funcName}/index\`)
    return map
  }, {})

module.exports = {
  target: 'node',
  entry,
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  output: {
    path: 'dist',
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [ 'node_modules', 'lib' ]
  }
}
`;
}

function babelrc() {
  var obj = {
    presets: [['env', {
      targets: {
        node: 4.3
      }
    }]]
  };

  return JSON.stringify(obj, null, 2) + '\n';
}