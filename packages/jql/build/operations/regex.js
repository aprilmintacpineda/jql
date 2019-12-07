"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $regex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  if (!expectedValue) return 0;
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue.test(actualValue[a])) return 1;
    }

    return 0;
  }

  return expectedValue.test(actualValue);
}

function $notRegex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  if (!expectedValue) return 0;
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue.test(actualValue[a])) return 0;
    }

    return 1;
  }

  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};