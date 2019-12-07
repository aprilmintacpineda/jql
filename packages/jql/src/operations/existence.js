const { validateValueConstructors, validateArrayOfConstructors } = require('../validateArgs');

function $in (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [String, Number]
      }
    ]
  );

  // actual value must be an array of string or number only
  validateArrayOfConstructors(
    '$in',
    [
      {
        values: expectedValue,
        constructors: [String, Number]
      }
    ]
  );

  return expectedValue.includes(actualValue);
}

function $notIn (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [Array]
      }
    ]
  );

  // actual value must be an array of string or number only
  validateArrayOfConstructors(
    '$in',
    [
      {
        values: expectedValue,
        constructors: [String, Number]
      }
    ]
  );

  return !expectedValue.includes(actualValue);
}

module.exports = {
  $in,
  $notIn
};
