/** @format */

const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');

function $regex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [RegExp]
    }
  ], true);

  if (!expectedValue) return false;

  const actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue.test(actualValue[a])) return true;

    return false;
  }

  return expectedValue.test(actualValue);
}

function $notRegex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [RegExp]
    }
  ], true);

  if (!expectedValue) return false;

  const actualValue = findValue(field, row);

  if (actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (expectedValue.test(actualValue[a])) return false;

    return true;
  }

  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex,
  $notRegex
};
