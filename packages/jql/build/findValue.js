"use strict";

function findValue(depth, current) {
  var value = current;
  if (!value) return value;

  var _depth = [].concat(depth);

  for (var a = 0, maxA = _depth.length; a < maxA; a++) {
    var depthValue = value[_depth.shift()];

    if (!depthValue) return depthValue;
    if (depthValue.constructor === Array) return depthValue.map(function (v) {
      return findValue(_depth, v);
    });
    value = depthValue;
  }

  return value;
}

module.exports = findValue;