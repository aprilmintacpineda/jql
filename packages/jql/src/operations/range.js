/** @format */

const findValue = require('../findValue');
const { isNotNumeric } = require('../helpers/number');
const {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLen
} = require('../validateArgs');

function $between (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ], true);

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
  const actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (min < value && max > value) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;

  return min < actualValue && max > actualValue;
}

function $iBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ], true);

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
  const actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (min <= value && max >= value) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;

  return min <= actualValue && max >= actualValue;
}

function $notBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$notBetween', [
    {
      value: range,
      constructors: [Array]
    }
  ], true);

  // range must be an array of numbers
  validateArrayOfConstructors('$notBetween', [
    {
      values: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNotNumeric(min) || isNotNumeric(max)) return 0;
  const actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (min > value || max < value) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;

  return min > actualValue || max < actualValue;
}

function $iNotBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ], true);

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
  const actualValue = findValue(field, row);

  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      const value = actualValue[a];
      if (min >= value || max <= value) return 1;
    }

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;

  return min >= actualValue || max <= actualValue;
}

module.exports = {
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween
};
