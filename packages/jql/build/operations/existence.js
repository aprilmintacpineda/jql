"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors,
    validateArrayOfConstructors = _require.validateArrayOfConstructors;

function $in(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return expectedValues.includes(findValue(field, row));
}

function $iIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row).toString().toLowerCase();

  for (var a = 0, maxA = expectedValues.length; a < maxA; a++) {
    var expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return 1;
  }

  return 0;
}

function $notIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  return !expectedValues.includes(findValue(field, row));
}

function $iNotIn(expectedValues, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValues,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$in', [{
    values: expectedValues,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row).toString().toLowerCase();

  for (var a = 0, maxA = expectedValues.length; a < maxA; a++) {
    var expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return 0;
  }

  return 1;
}

module.exports = {
  $in: $in,
  $iIn: $iIn,
  $notIn: $notIn,
  $iNotIn: $iNotIn
};