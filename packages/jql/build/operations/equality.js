"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $eq(expectedValue, field, row) {
  validateValueConstructors('$eq', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  var actualValue = findValue(field, row);

  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array) return !actualValue.length;
    return false;
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue === actualValue[a]) return true;
    }

    return false;
  }

  return expectedValue === actualValue;
}

function $ne(expectedValue, field, row) {
  validateValueConstructors('$ne', [{
    value: expectedValue,
    constructors: [String, Number]
  }]);
  var actualValue = findValue(field, row);
  return expectedValue !== actualValue;
}

function $gt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  var actualValue = findValue(field, row);
  return expectedValue > actualValue;
}

function $gte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  var actualValue = findValue(field, row);
  return expectedValue >= actualValue;
}

function $lt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  var actualValue = findValue(field, row);
  return actualValue < expectedValue;
}

function $lte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  var actualValue = findValue(field, row);
  return actualValue <= expectedValue;
}

module.exports = {
  $eq: $eq,
  $ne: $ne,
  $gt: $gt,
  $gte: $gte,
  $lt: $lt,
  $lte: $lte
};