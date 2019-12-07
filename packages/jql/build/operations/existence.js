"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors,
    validateArrayOfConstructors = _require.validateArrayOfConstructors,
    validateArrayLenMin = _require.validateArrayLenMin;

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
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValues.includes(actualValue[a])) return 1;
    }

    return 0;
  }

  return expectedValues.includes(actualValue);
}

function $iIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$in', expectedValues, 1);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var iExpectedValues = expectedValues.map(function (expectedValue) {
    return expectedValue.toString().toLowerCase();
  });
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValues.includes(actualValue[a].toString().toLowerCase())) return 1;
    }

    return 0;
  }

  return iExpectedValues.includes(actualValue.toString().toLowerCase());
}

function $notIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$in', expectedValues, 1);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValues.includes(actualValue[a])) return 0;
    }

    return 1;
  }

  return !expectedValues.includes(actualValue);
}

function $iNotIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayLenMin('$in', expectedValues, 1);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var iExpectedValues = expectedValues.map(function (expectedValue) {
    return expectedValue.toString().toLowerCase();
  });
  var actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (iExpectedValues.includes(actualValue[a].toString().toLowerCase())) return 0;
    }

    return 1;
  }

  return !iExpectedValues.includes(actualValue);
}

module.exports = {
  $in: $in,
  $iIn: $iIn,
  $notIn: $notIn,
  $iNotIn: $iNotIn
};