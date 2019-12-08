"use strict";

var JQLValue = require('./constructs/JQLValue');

function findValue(depth, current) {
  var value = current;
  if (!value) return value;

  var _depth = [].concat(depth);

  for (var a = 0, maxA = _depth.length; a < maxA; a++) {
    var key = _depth.shift();

    if (!(key in value)) return new JQLValue(undefined, false);
    var depthValue = value[key];
    if (!depthValue) return new JQLValue(depthValue, true);
    if (depthValue.constructor === Array) return depthValue.map(function (v) {
      return findValue(_depth, v);
    });
    value = depthValue;
  }

  return new JQLValue(value, true);
}

module.exports = findValue;