"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $regex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  var actualValue = findValue(field, row);
  return expectedValue.test(actualValue);
}

function $notRegex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  var actualValue = findValue(field, row);
  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};