"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $regex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  if (!expectedValue) return false;
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue.test(actualValue[a])) return true;
    }

    return false;
  }

  return expectedValue.test(actualValue);
}

function $notRegex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  if (!expectedValue) return false;
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue.test(actualValue[a])) return false;
    }

    return true;
  }

  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};