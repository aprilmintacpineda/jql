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

  return expectedValue.test(findValue(field, row));
}

function $notRegex (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$in', [
    {
      value: expectedValue,
      constructors: [RegExp]
    }
  ]);

  return !expectedValue.test(findValue(field, row));
}

module.exports = {
  $regex,
  $notRegex
};
