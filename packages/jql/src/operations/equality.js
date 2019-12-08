/** @format */

const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');
const { isNotNumeric } = require('../helpers/number');

function eqRecursive (expectedValue, actualValue) {
  // handle empty array equality
  // e.g., { field: [] }
  if (expectedValue && expectedValue.constructor === Array) {
    if (actualValue && actualValue.constructor === Array) return !actualValue.length;

    return 0;
  }

  // handle array values
  if (actualValue && actualValue.constructor === Array) {
    // if one of the item matches the expected value,
    // we return 1 immediately
    for (let a = 0, maxA = actualValue.length; a < maxA; a++) {
      // recursively call eq until it returns
      // a valid equality either by empty array equality
      // or by data equality
      if (eqRecursive(expectedValue, actualValue[a])) return 1;
    }

    return 0;
  }

  // data equality
  return expectedValue === actualValue;
}

function $eq (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$eq', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  return eqRecursive(expectedValue, findValue(field, row));
}

function $ne (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$ne', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  return !eqRecursive(expectedValue, findValue(field, row));
}

// TODO
// function $like (expression, actualValue) {
//
// }

function gtRecursive (expectedValue, actualValue) {
  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (gtRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue > expectedValue;
}

function $gt (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [Number]
      }
    ],
    true
  );

  return gtRecursive(expectedValue, findValue(field, row));
}

function gteRecursive (expectedValue, actualValue) {
  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (gteRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue >= expectedValue;
}

function $gte (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [Number]
      }
    ],
    true
  );

  return gteRecursive(expectedValue, findValue(field, row));
}

function $lt (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [Number]
      }
    ],
    true
  );

  return !gteRecursive(expectedValue, findValue(field, row));
}

function lteRecursive (expectedValue, actualValue) {
  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (lteRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  if (isNotNumeric(actualValue)) return 0;
  return actualValue <= expectedValue;
}

function $lte (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors(
    '$in',
    [
      {
        value: expectedValue,
        constructors: [Number]
      }
    ],
    true
  );

  return lteRecursive(expectedValue, findValue(field, row));
}

module.exports = {
  $eq,
  $ne,
  $gt,
  $gte,
  $lt,
  $lte
};
