'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api) {
  if (!api) {
    return [];
  }

  var paths = Object.keys(api.paths);

  var methods = paths.reduce(function (acc, path) {
    var nestedMethods = Object.keys(api.paths[path]).map(function (method) {
      return { path, method };
    });
    return acc.concat(nestedMethods);
  }, []);

  var integrations = methods.map(function (_ref) {
    var path = _ref.path,
        method = _ref.method;

    var integration = api.paths[path][method]['x-amazon-apigateway-integration'];
    return { path, method, integration };
  });

  return integrations;
};

module.exports = exports['default'];