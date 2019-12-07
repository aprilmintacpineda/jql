/** @format */

const { validateValueConstructors, validateArrayOfConstructors } = require('../validateArgs');

function $in (expectedValues, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValues,
      constructors: [String, Number]
    }
  ]);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  return expectedValues.includes(actualValue);
}

function $iIn (expectedValues, value) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValues,
      constructors: [String, Number]
    }
  ]);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const actualValue = value.toString().toLowerCase();

  for (let a = 0, maxA = expectedValues.length; a < maxA; a++) {
    const expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return true;
  }

  return false;
}

function $notIn (expectedValues, actualValue) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValues,
      constructors: [Array]
    }
  ]);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  return !expectedValues.includes(actualValue);
}

function $iNotIn (expectedValues, value) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValues,
      constructors: [Array]
    }
  ]);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const actualValue = value.toString().toLowerCase();

  for (let a = 0, maxA = expectedValues.length; a < maxA; a++) {
    const expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return false;
  }

  return true;
}

module.exports = {
  $in,
  $iIn,
  $notIn,
  $iNotIn
};
