"use strict";

var JQLValue = require('../constructs/JQLValue');

var findValue = require('../findValue');

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

var _require2 = require('../helpers/number'),
    isNotNumeric = _require2.isNotNumeric;

function eqRecursive(expectedValue, actualValue) {
  if (expectedValue && expectedValue.constructor === Array && actualValue.constructor === Array && actualValue[0] && actualValue[0].constructor === JQLValue) {
    var _exists = actualValue.exists,
        _value = actualValue.value;
    return _exists && _value.constructor === Array && !_value.length;
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (eqRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists) return 0;
  return expectedValue === value;
}

function $eq(expectedValue, field, row) {
  validateValueConstructors('$eq', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  return eqRecursive(expectedValue, findValue(field, row));
}

function neRecursive(expectedValue, actualValue) {
  if (expectedValue && expectedValue.constructor === Array) {
    var _actualValue = actualValue[0];

    if (_actualValue && _actualValue.constructor === JQLValue) {
      var _exists2 = actualValue.exists,
          _value2 = actualValue.value;
      return _exists2 && _value2.constructor === Array && _value2.length;
    }
  }

  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (!neRecursive(expectedValue, actualValue[a])) return 0;
    }

    return 1;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists) return 0;
  return expectedValue !== value;
}

function $ne(expectedValue, field, row) {
  validateValueConstructors('$ne', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  return neRecursive(expectedValue, findValue(field, row));
}

function gtRecursive(expectedValue, actualValue) {
  if (actualValue && actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (gtRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists || isNotNumeric(value)) return 0;
  return value > expectedValue;
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

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists || isNotNumeric(value)) return 0;
  return value >= expectedValue;
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

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists || isNotNumeric(value)) return 0;
  return value < expectedValue;
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

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists || isNotNumeric(value)) return 0;
  return value <= expectedValue;
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