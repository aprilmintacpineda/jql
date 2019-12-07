/** @format */

const findValue = require('../findValue');
const { validateValueConstructors, validateArrayOfConstructors } = require('../validateArgs');

function $in (expectedValues, field, row) {
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

  const actualValue = findValue(field, row);
  return expectedValues.includes(actualValue);
}

function $iIn (expectedValues, field, row) {
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

  const value = findValue(field, row);
  const actualValue = value.toString().toLowerCase();

  for (let a = 0, maxA = expectedValues.length; a < maxA; a++) {
    const expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return 1;
  }

  return 0;
}

function $notIn (expectedValues, field, row) {
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

  const actualValue = findValue(field, row);
  return !expectedValues.includes(actualValue);
}

function $iNotIn (expectedValues, field, row) {
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

  const value = findValue(field, row);
  const actualValue = value.toString().toLowerCase();

  for (let a = 0, maxA = expectedValues.length; a < maxA; a++) {
    const expectedValue = expectedValues[a].toString().toLowerCase();
    if (expectedValue === actualValue) return 0;
  }

  return 1;
}

module.exports = {
  $in,
  $iIn,
  $notIn,
  $iNotIn
};
