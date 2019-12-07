/** @format */

const findValue = require('../findValue');
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
  ]);

  // range must be an array of numbers
  validateArrayOfConstructors('$between', [
    {
      value: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNaN(min) || isNaN(max)) return false;
  const actualValue = findValue(field, row);
  if (isNaN(actualValue)) return false;

  return actualValue > min && actualValue < max;
}

function $iBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ]);

  // range must be an array of numbers
  validateArrayOfConstructors('$between', [
    {
      value: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNaN(min) || isNaN(max)) return false;
  const actualValue = findValue(field, row);
  if (isNaN(actualValue)) return false;

  return actualValue >= min && actualValue <= max;
}

function $notBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ]);

  // range must be an array of numbers
  validateArrayOfConstructors('$between', [
    {
      value: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNaN(min) || isNaN(max)) return false;
  const actualValue = findValue(field, row);
  if (isNaN(actualValue)) return false;

  return actualValue < min || actualValue > max;
}

function $iNotBetween (range, field, row) {
  // validate arguments
  validateValueConstructors('$between', [
    {
      value: range,
      constructors: [Array]
    }
  ]);

  // range must be an array of numbers
  validateArrayOfConstructors('$between', [
    {
      value: range,
      constructors: [Number]
    }
  ]);

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;
  if (isNaN(min) || isNaN(max)) return false;
  const actualValue = findValue(field, row);
  if (isNaN(actualValue)) return false;

  return actualValue <= min || actualValue >= max;
}

module.exports = {
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween
};
