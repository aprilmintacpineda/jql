const { validateValueConstructors } = require('../validateArgs');

function $regex (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ]
  );

  return expectedValue.test(actualValue);
}

function $notRegex (expectedValue, actualValue) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ]
  );

  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex,
  $notRegex
};
