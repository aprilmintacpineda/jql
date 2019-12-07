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
  ]);

  const actualValue = findValue(field, row);
  return expectedValue.test(actualValue);
}

function $notRegex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [RegExp]
    }
  ]);

  const actualValue = findValue(field, row);
  return !expectedValue.test(actualValue);
}

module.exports = {
  $regex,
  $notRegex
};
