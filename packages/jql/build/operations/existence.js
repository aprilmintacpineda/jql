"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors,
    validateArrayOfConstructors = _require.validateArrayOfConstructors;

function $in(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [String, Number]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row);
  return expectedValues.includes(actualValue);
}

function $iIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [String, Number]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var value = findValue(field, row);
  var actualValue = value.toString().toLowerCase();

  for (var a = 0, maxA = expectedValues.length; a < maxA; a++) {
    var expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return true;
  }

  return false;
}

function $notIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row);
  return !expectedValues.includes(actualValue);
}

function $iNotIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }]);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var value = findValue(field, row);
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