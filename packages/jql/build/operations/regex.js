"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $regex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  return expectedValue.test(findValue(field, row));
}

function $notRegex(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  return !expectedValue.test(findValue(field, row));
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};