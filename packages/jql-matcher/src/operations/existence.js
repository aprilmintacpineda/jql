/** @format */

const findValue = require('../findValue');
const {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLenMin
} = require('../validateArgs');

function inRecursive (expectedValues, actualValue, caseInsensitive) {
  // handle array values
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (inRecursive(expectedValues, actualValue[a], caseInsensitive))
        return 1;
    }

    return 0;
  }

  const { exists, value } = actualValue;
  if (!exists) return 0;

  return expectedValues.includes(
    caseInsensitive && value
      ?  value.toString().toLowerCase()
      : value
  );
}

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

  return inRecursive(expectedValues, findValue(field, row));
}

function $iIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$iIn',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$iIn', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$iIn', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  return inRecursive(
    expectedValues.map(expectedValue => expectedValue.toString().toLowerCase()),
    findValue(field, row),
    true
  );
}

function notInRecursive (expectedValues, actualValue, caseInsensitive) {
  // handle array values
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      if (notInRecursive(expectedValues, actualValue[a], caseInsensitive))
        return 1;
    }

    return 0;
  }

  const { exists, value } = actualValue;
  if (!exists) return 0;

  return !expectedValues.includes(
    caseInsensitive && value
      ?  value.toString().toLowerCase()
      : value
  );
}

function $notIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$notIn',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$notIn', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$notIn', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  return notInRecursive(expectedValues, findValue(field, row));
}

function $iNotIn (expectedValues, field, row) {
  // validate arguments
  validateValueConstructors(
    '$iNotIn',
    [
      {
        value: expectedValues,
        constructors: [Array]
      }
    ],
    true
  );

  validateArrayLenMin('$iNotIn', expectedValues, 1);

  // actual value must be an array of string or number only
  validateArrayOfConstructors('$iNotIn', [
    {
      values: expectedValues,
      constructors: [String, Number]
    }
  ]);

  return notInRecursive(
    expectedValues.map(expectedValue => expectedValue.toString().toLowerCase()),
    findValue(field, row),
    true
  );
}

module.exports = {
  $in,
  $iIn,
  $notIn,
  $iNotIn
};
