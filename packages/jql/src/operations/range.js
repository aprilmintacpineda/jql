const { validateValueConstructors, validateArrayOfConstructors, validateArrayLen } = require('../validateArgs');

function $between (range, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Array]
      }
    ]
  );

  // range must be an array of numbers
  validateArrayOfConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Number]
      }
    ]
  );

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;

  return actualValue > min && actualValue < max;
}

function $iBetween (range, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Array]
      }
    ]
  );

  // range must be an array of numbers
  validateArrayOfConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Number]
      }
    ]
  );

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;

  return actualValue >= min && actualValue <= max;
}

function $notBetween (range, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Array]
      }
    ]
  );

  // range must be an array of numbers
  validateArrayOfConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Number]
      }
    ]
  );

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;

  return actualValue < min || actualValue > max;
}

function $iNotBetween (range, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Array]
      }
    ]
  );

  // range must be an array of numbers
  validateArrayOfConstructors(
    '$between',
    [
      {
        value: range,
        constructors: [Number]
      }
    ]
  );

  // range must have 2 items
  validateArrayLen('$between', range, 2);

  const [min, max] = range;

  return actualValue <= min || actualValue >= max;
}

module.exports = {
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween
};
