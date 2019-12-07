"use strict";

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors,
    validateArrayOfConstructors = _require.validateArrayOfConstructors;

function $in(expectedValues, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [String, Number]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return expectedValues.includes(actualValue);
}

function $iIn(expectedValues, value) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [String, Number]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = value.toString().toLowerCase();

  for (var a = 0, maxA = expectedValues.length; a < maxA; a++) {
    var expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return true;
  }

  return false;
}

function $notIn(expectedValues, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return !expectedValues.includes(actualValue);
}

function $iNotIn(expectedValues, value) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = value.toString().toLowerCase();

  for (var a = 0, maxA = expectedValues.length; a < maxA; a++) {
    var expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return false;
  }

  return true;
}

module.exports = {
  $in: $in,
  $iIn: $iIn,
  $notIn: $notIn,
  $iNotIn: $iNotIn
};