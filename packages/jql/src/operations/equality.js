/** @format */

const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');

function $eq (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$eq', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  const actualValue = findValue(field, row);

  // handle equality to empty array
  // e.g., { field: [] }
  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array)
      return !actualValue.length;

    return false;
  }

  // handle array values
  if (
    actualValue &&
    actualValue.constructor === Array
  ) {
    // if one of the item matches the expected value,
    // we return immediately
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue === actualValue[a]) return true;

    return false;
  }

  return expectedValue === actualValue;
}

function $ne (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$ne', [
    {
      value: expectedValue,
      constructors: [String, Number]
    }
  ]);

  const actualValue = findValue(field, row);
  return expectedValue !== actualValue;
}

// TODO
// function $like (expression, actualValue) {
//
// }

function $gt (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  const actualValue = findValue(field, row);
  return expectedValue > actualValue;
}

function $gte (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  const actualValue = findValue(field, row);
  return expectedValue >= actualValue;
}

function $lt (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  const actualValue = findValue(field, row);
  return actualValue < expectedValue;
}

function $lte (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  const actualValue = findValue(field, row);
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
