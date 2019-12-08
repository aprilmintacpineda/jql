"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors,
    validateArrayOfConstructors = _require.validateArrayOfConstructors,
    validateArrayLenMin = _require.validateArrayLenMin;

function inRecursive(expectedValues, actualValue, caseInsensitive) {
  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (inRecursive(expectedValues, actualValue[a], caseInsensitive)) return 1;
    }

    return 0;
  }

  return expectedValues.includes(caseInsensitive ? actualValue.toString().toLowerCase() : actualValue);
}

function $in(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$in', expectedValues, 1);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return inRecursive(expectedValues, findValue(field, row));
}

function $iIn(expectedValues, field, row) {
  validateValueConstructors('$iIn', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$iIn', expectedValues, 1);
  validateArrayOfConstructors('$iIn', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return inRecursive(expectedValues.map(function (expectedValue) {
    return expectedValue.toString().toLowerCase();
  }), findValue(field, row), true);
}

function $notIn(expectedValues, field, row) {
  validateValueConstructors('$notIn', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$notIn', expectedValues, 1);
  validateArrayOfConstructors('$notIn', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return !inRecursive(expectedValues, findValue(field, row));
}

function $iNotIn(expectedValues, field, row) {
  validateValueConstructors('$iNotIn', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$iNotIn', expectedValues, 1);
  validateArrayOfConstructors('$iNotIn', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return !inRecursive(expectedValues.map(function (expectedValue) {
    return expectedValue.toString().toLowerCase();
  }), findValue(field, row), true);
}

module.exports = {
  $in: $in,
  $iIn: $iIn,
  $notIn: $notIn,
  $iNotIn: $iNotIn
};