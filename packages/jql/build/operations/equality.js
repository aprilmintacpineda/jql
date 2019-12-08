"use strict";

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

var _require2 = require('../helpers/number'),
    isNotNumeric = _require2.isNotNumeric;

function eqRecursive(expectedValue, actualValue) {
  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array) return !actualValue.length;
    return 0;
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (eqRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  return expectedValue === actualValue;
}

function $eq(expectedValue, field, row) {
  validateValueConstructors('$eq', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  return eqRecursive(expectedValue, findValue(field, row));
}

function $ne(expectedValue, field, row) {
  validateValueConstructors('$ne', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  return !eqRecursive(expectedValue, findValue(field, row));
}

function gtRecursive(expectedValue, actualValue) {
  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (gtRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue > expectedValue;
}

function $gt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }], true);
  return gtRecursive(expectedValue, findValue(field, row));
}

function gteRecursive(expectedValue, actualValue) {
  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (gteRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue >= expectedValue;
}

function $gte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }], true);
  return gteRecursive(expectedValue, findValue(field, row));
}

function ltRecursive(expectedValue, actualValue) {
  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (ltRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue < expectedValue;
}

function $lt(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }], true);
  return ltRecursive(expectedValue, findValue(field, row));
}

function lteRecursive(expectedValue, actualValue) {
  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (lteRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue <= expectedValue;
}

function $lte(expectedValue, field, row) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }], true);
  return lteRecursive(expectedValue, findValue(field, row));
}

module.exports = {
  $eq: $eq,
  $ne: $ne,
  $gt: $gt,
  $gte: $gte,
  $lt: $lt,
  $lte: $lte
};