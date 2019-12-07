"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

var _require2 = require('../helpers/number'),
    isNotNumeric = _require2.isNotNumeric;

function $eq(expectedValue, field, row) {
  validateValueConstructors('$eq', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  var actualValue = findValue(field, row);

  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array) return !actualValue.length;
    return 0;
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue === actualValue[a]) return 1;
    }

    return 0;
  }

  return expectedValue === actualValue;
}

function $ne(expectedValue, field, row) {
  validateValueConstructors('$ne', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  var actualValue = findValue(field, row);

  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array) return actualValue.length;
    return 1;
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (expectedValue === actualValue[a]) return 0;
    }

    return 1;
  }

  return expectedValue !== actualValue;
}

function $gt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  if (isNotNumeric(expectedValue)) return false;
  var actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      var value = actualValue[a];
      if (isNotNumeric(value)) continue;
      if (value > expectedValue) return true;
    }

    return false;
  }

  if (isNotNumeric(actualValue)) return false;
  return actualValue > expectedValue;
}

function $gte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  if (isNotNumeric(expectedValue)) return false;
  var actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      var value = actualValue[a];
      if (isNotNumeric(value)) continue;
      if (value >= expectedValue) return true;
    }

    return false;
  }

  if (isNotNumeric(actualValue)) return false;
  return actualValue >= expectedValue;
}

function $lt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  if (isNotNumeric(expectedValue)) return false;
  var actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      var value = actualValue[a];
      if (isNotNumeric(value)) continue;
      if (value < expectedValue) return true;
    }

    return false;
  }

  if (isNotNumeric(actualValue)) return false;
  return actualValue < expectedValue;
}

function $lte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  if (isNotNumeric(expectedValue)) return false;
  var actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      var value = actualValue[a];
      if (isNotNumeric(value)) continue;
      if (value <= expectedValue) return true;
    }

    return false;
  }

  if (isNotNumeric(actualValue)) return false;
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