/** @format */

const { validateValueConstructors } = require('../validateArgs');

function $eq (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$eq', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  // handle equality to empty array
  // e.g., { field: [] }
  if (
    expectedValue &&
    actualValue &&
    expectedValue.constructor === Array &&
    actualValue.constructor === Array
  )
    return !expectedValue.length && !actualValue.length;

  return expectedValue === actualValue;
}

function $ne (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$ne', [
    {
      value: expectedValue,
      constructors: [String, Number]
    }
  ]);

  return expectedValue !== actualValue;
}

// TODO
// function $like (expression, actualValue) {
//
// }

function $gt (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  return expectedValue > actualValue;
}

function $gte (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  return expectedValue >= actualValue;
}

function $lt (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  return actualValue < expectedValue;
}

function $lte (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  return actualValue <= expectedValue;
}

module.exports = {
  $eq,
  $ne,
  $gt,
  $gte,
  $lt,
  $lte
};
