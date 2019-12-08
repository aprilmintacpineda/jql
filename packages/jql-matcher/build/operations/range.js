"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var findValue = require('../findValue');

var _require = require('../helpers/number'),
    isNotNumeric = _require.isNotNumeric;

var _require2 = require('../validateArgs'),
    validateValueConstructors = _require2.validateValueConstructors,
    validateArrayOfConstructors = _require2.validateArrayOfConstructors,
    validateArrayLen = _require2.validateArrayLen;

function betweenRecursive(min, max, actualValue, inclusive) {
  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (betweenRecursive(min, max, actualValue[a], inclusive)) return 1;
    }

    return 0;
  }

  var value = actualValue.value,
      exists = actualValue.exists;
  if (!exists || isNotNumeric(value)) return 0;
  return inclusive ? min <= value && max >= value : min < value && max > value;
}

function $between(range, field, row) {
  validateValueConstructors('$between', [{
    value: range,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$between', [{
    values: range,
    constructors: [Number]
  }]);
  validateArrayLen('$between', range, 2);

  var _range = _slicedToArray(range, 2),
      min = _range[0],
      max = _range[1];

  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return betweenRecursive(min, max, findValue(field, row));
}

function $iBetween(range, field, row) {
  validateValueConstructors('$iBetween', [{
    value: range,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$iBetween', [{
    values: range,
    constructors: [Number]
  }]);
  validateArrayLen('$iBetween', range, 2);

  var _range2 = _slicedToArray(range, 2),
      min = _range2[0],
      max = _range2[1];

  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return betweenRecursive(min, max, findValue(field, row), true);
}

function notBetweenRecursive(min, max, actualValue, inclusive) {
  if (actualValue.constructor === Array) {
    for (var a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (notBetweenRecursive(min, max, actualValue[a], inclusive)) return 1;
    }

    return 0;
  }

  var exists = actualValue.exists,
      value = actualValue.value;
  if (!exists || isNotNumeric(value)) return 0;
  return inclusive ? min >= value || max <= value : min > value || max < value;
}

function $notBetween(range, field, row) {
  validateValueConstructors('$notBetween', [{
    value: range,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$notBetween', [{
    values: range,
    constructors: [Number]
  }]);
  validateArrayLen('$notBetween', range, 2);

  var _range3 = _slicedToArray(range, 2),
      min = _range3[0],
      max = _range3[1];

  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return notBetweenRecursive(min, max, findValue(field, row));
}

function $iNotBetween(range, field, row) {
  validateValueConstructors('$iNotBetween', [{
    value: range,
    constructors: [Array]
  }], true);
  validateArrayOfConstructors('$iNotBetween', [{
    values: range,
    constructors: [Number]
  }]);
  validateArrayLen('$iNotBetween', range, 2);

  var _range4 = _slicedToArray(range, 2),
      min = _range4[0],
      max = _range4[1];

  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return notBetweenRecursive(min, max, findValue(field, row), true);
}

module.exports = {
  $between: $between,
  $notBetween: $notBetween,
  $iBetween: $iBetween,
  $iNotBetween: $iNotBetween
};