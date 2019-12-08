/** @format */

const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');

function regexRecursive (expectedValue, actualValue) {
  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (regexRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  return expectedValue.test(actualValue);
}

function $regex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$regex',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ],
    true
  );

  if (!expectedValue) return 0;
  return regexRecursive(expectedValue, findValue(field, row));
}

function $notRegex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$notRegex',
    [
      {
        value: expectedValue,
        constructors: [RegExp]
      }
    ],
    true
  );

  if (!expectedValue) return 0;
  return !regexRecursive(expectedValue, findValue(field, row));
}

module.exports = {
  $regex,
  $notRegex
};
