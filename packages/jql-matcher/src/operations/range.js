/** @format */

const findValue = require('../findValue');
const { isNotNumeric } = require('../helpers/number');
const {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLen
} = require('../validateArgs');

function betweenRecursive (min, max, actualValue, inclusive) {
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (betweenRecursive(min, max, actualValue[a], inclusive)) return 1;

    return 0;
  }

  const { value, exists } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;

  return inclusive
    ? min <= value && max >= value
    : min < value && max > value;
}

function $between (range, field, row) {
  // validate arguments
  validateValueConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Array]
      }
    ],
    true
  );

  // range must be an array of numbers
  validateArrayOfConstructors('$between', [
    {
      values: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return betweenRecursive(min, max, findValue(field, row));
}

function $iBetween (range, field, row) {
  // validate arguments
  validateValueConstructors(
    '$iBetween',
    [
      {
        value: range,
        constructors: [Array]
      }
    ],
    true
  );

  // range must be an array of numbers
  validateArrayOfConstructors('$iBetween', [
    {
      values: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$iBetween', range, 2);

  const [min, max] = range;
  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return betweenRecursive(min, max, findValue(field, row), true);
}

function notBetweenRecursive (min, max, actualValue, inclusive) {
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (notBetweenRecursive(min, max, actualValue[a], inclusive)) return 1;

    return 0;
  }

  const { exists, value } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;

  return inclusive
    ? min >= value || max <= value
    : min > value || max < value;
}

function $notBetween (range, field, row) {
  // validate arguments
  validateValueConstructors(
    '$notBetween',
    [
      {
        value: range,
        constructors: [Array]
      }
    ],
    true
  );

  // range must be an array of numbers
  validateArrayOfConstructors('$notBetween', [
    {
      values: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$notBetween', range, 2);

  const [min, max] = range;
  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return notBetweenRecursive(min, max, findValue(field, row));
}

function $iNotBetween (range, field, row) {
  // validate arguments
  validateValueConstructors(
    '$iNotBetween',
    [
      {
        value: range,
        constructors: [Array]
      }
    ],
    true
  );

  // range must be an array of numbers
  validateArrayOfConstructors('$iNotBetween', [
    {
      values: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$iNotBetween', range, 2);

  const [min, max] = range;
  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  return notBetweenRecursive(min, max, findValue(field, row), true);
}

module.exports = {
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween
};
