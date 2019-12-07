/** @format */

const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');

function $regex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ],
    true
  );

  if (!expectedValue) return 0;

  const actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue.test(actualValue[a])) return 1;

    return 0;
  }

  return expectedValue.test(actualValue);
}

function $notRegex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ],
    true
  );

  if (!expectedValue) return 0;

  const actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue.test(actualValue[a])) return 0;

    return 1;
  }

  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex,
  $notRegex
};
