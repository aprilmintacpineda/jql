/** @format */

const findValue = require('../findValue');
const {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLenMin
} = require('../validateArgs');

function $in (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$in', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const actualValue = findValue(field, row);

  // handle array values
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValues.includes(actualValue[a])) return 1;

    return 0;
  }

  return expectedValues.includes(actualValue);
}

function $iIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$in', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const iExpectedValues = expectedValues.map(expectedValue =>
    expectedValue.toString().toLowerCase()
  );
  const actualValue = findValue(field, row);

  // handle array values
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValues.includes(actualValue[a].toString().toLowerCase())) return 1;

    return 0;
  }

  return iExpectedValues.includes(actualValue.toString().toLowerCase());
}

function $notIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$in', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const actualValue = findValue(field, row);

  // handle array values
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValues.includes(actualValue[a])) return 0;

    return 1;
  }

  return !expectedValues.includes(actualValue);
}

function $iNotIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$in', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$in', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  const iExpectedValues = expectedValues.map(expectedValue =>
    expectedValue.toString().toLowerCase()
  );
  const actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (iExpectedValues.includes(actualValue[a].toString().toLowerCase())) return 0;

    return 1;
  }

  return !iExpectedValues.includes(actualValue);
}

module.exports = {
  $in,
  $iIn,
  $notIn,
  $iNotIn
};
