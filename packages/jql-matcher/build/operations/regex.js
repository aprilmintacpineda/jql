"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function regexRecursive(expectedValue, actualValue) {
  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (regexRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists) return 0;
  return expectedValue.test(value);
}

function $regex(expectedValue, field, row) {
  validateValueConstructors('$regex', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  return regexRecursive(expectedValue, findValue(field, row));
}

function notRegexRecursive(expectedValue, actualValue) {
  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (notRegexRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists) return 0;
  return !expectedValue.test(value);
}

function $notRegex(expectedValue, field, row) {
  validateValueConstructors('$notRegex', [{
    value: expectedValue,
    constructors: [RegExp]
  }], true);
  return notRegexRecursive(expectedValue, findValue(field, row));
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};