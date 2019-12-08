"use strict";

var JQLValue = require('./constructs/JQLValue');

function findValue(depth, current) {
  var value = current;

  var _depth = [].concat(depth);

  for (var a = 0, maxA = _depth.length; a < maxA; a++) {
    if (value.constructor !== Object) break;

    var key = _depth.shift();

    if (!(key in value)) return new JQLValue(undefined, false);
    var depthValue = value[key];
    if (!depthValue) return new JQLValue(depthValue, true);

    if (depthValue.constructor === Array) {
      if (!depthValue.length) return new JQLValue(depthValue, true);
      return depthValue.map(function (v) {
        return findValue(_depth, v);
      });
    }

    value = depthValue;
  }

  return new JQLValue(value, true);
}

module.exports = findValue;