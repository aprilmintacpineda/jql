"use strict";

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $regex(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  return expectedValue.test(actualValue);
}

function $notRegex(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [RegExp]
  }]);
  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex: $regex,
  $notRegex: $notRegex
};