"use strict";

var _require = require('../validateArgs'),
    validateValueConstructors = _require.validateValueConstructors;

function $eq(expectedValue, actualValue) {
  validateValueConstructors('$eq', [{
    value: expectedValue,
    constructors: [String, Number, Array]
  }]);
  if (expectedValue && actualValue && expectedValue.constructor === Array && actualValue.constructor === Array) return !expectedValue.length && !actualValue.length;
  return expectedValue === actualValue;
}

function $ne(expectedValue, actualValue) {
  validateValueConstructors('$ne', [{
    value: expectedValue,
    constructors: [String, Number]
  }]);
  return expectedValue !== actualValue;
}

function $gt(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  return expectedValue > actualValue;
}

function $gte(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  return expectedValue >= actualValue;
}

function $lt(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
  return actualValue < expectedValue;
}

function $lte(expectedValue, actualValue) {
  validateValueConstructors('$in', [{
    value: expectedValue,
    constructors: [Number]
  }]);
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