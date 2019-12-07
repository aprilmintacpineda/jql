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

    return 0;
  }

  // handle array values
  if (
    actualValue &&
    actualValue.constructor === Array
  ) {
    // if one of the item matches the expected value,
    // we return 1 immediately
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue === actualValue[a]) return 1;

    return 0;
  }

  return expectedValue === actualValue;
}

function $ne (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$ne', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  const actualValue = findValue(field, row);

  // handle equality to empty array
  // e.g., { field: { $ne: [] } }
  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array)
      return actualValue.length;

    // the value is not an array, we still return 1
    return 1;
  }

  // handle array values
  if (
    actualValue &&
    actualValue.constructor === Array
  ) {
    // if one of the item matches the expected value,
    // we return 0 immediately.
    // all values must not match for this to return 1
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue === actualValue[a]) return 0;

    return 1;
  }

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

  if (isNaN(expectedValue)) return false;
  const actualValue = findValue(field, row);

  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (isNaN(value)) continue;
      if (value > expectedValue) return true;
    }

    return false;
  }

  if (isNaN(actualValue)) return false;

  return actualValue > expectedValue;
}

function $gte (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  if (isNaN(expectedValue)) return false;
  const actualValue = findValue(field, row);

  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (isNaN(value)) continue;
      if (value >= expectedValue) return true;
    }

    return false;
  }

  if (isNaN(actualValue)) return false;

  return actualValue >= expectedValue;
}

function $lt (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [Number]
    }
  ]);

  if (isNaN(expectedValue)) return false;
  const actualValue = findValue(field, row);

  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (isNaN(value)) continue;
      if (value < expectedValue) return true;
    }

    return false;
  }

  if (isNaN(actualValue)) return false;

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

  if (isNaN(expectedValue)) return false;
  const actualValue = findValue(field, row);

  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (isNaN(value)) continue;
      if (value <= expectedValue) return true;
    }

    return false;
  }

  if (isNaN(actualValue)) return false;

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
