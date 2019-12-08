/** @format */

const JQLValue = require('../constructs/JQLValue');
const findValue = require('../findValue');
const { validateValueConstructors } = require('../validateArgs');
const { isNotNumeric } = require('../helpers/number');

function eqRecursive (expectedValue, actualValue) {
  // handle empty array equality
  // e.g., { field: [] }
  if (
    expectedValue &&
    expectedValue.constructor === Array &&
    actualValue.constructor === JQLValue
  ) {
    const { exists, value } = actualValue;
    return exists && value.constructor === Array && !value.length;
  }

  // handle array values
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (eqRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  const { exists, value } = actualValue;

  if (!exists) {
    // query undefined to a field that does not exist
    // e.g., { doesNotExist: undefined }
    if (expectedValue === undefined) return 1;
    return 0;
  }
  return expectedValue === value;
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

function neRecursive (expectedValue, actualValue) {
  // handle empty array equality
  // e.g., { field: [] }
  if (expectedValue && expectedValue.constructor === Array) {
    const _actualValue = actualValue[0];

    if (_actualValue && _actualValue.constructor === JQLValue) {
      const { exists, value } = actualValue;
      return exists && value.constructor === Array && value.length;
    }
  }

  // handle array values
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (!neRecursive(expectedValue, actualValue[a])) return 0;

    return 1;
  }

  // data equality
  const { exists, value } = actualValue;
  if (!exists) return 0;
  return expectedValue !== value;
}

function $ne (expectedValue, field, row) {
  // validate arguments
  validateValueConstructors('$ne', [
    {
      value: expectedValue,
      constructors: [String, Number, Array]
    }
  ]);

  return neRecursive(expectedValue, findValue(field, row));
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

  const { exists, value } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;
  return value > expectedValue;
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

  const { exists, value } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;
  return value >= expectedValue;
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

function ltRecursive (expectedValue, actualValue) {
  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (ltRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  const { exists, value } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;
  return value < expectedValue;
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

  return ltRecursive(expectedValue, findValue(field, row));
}

function lteRecursive (expectedValue, actualValue) {
  // handle values as array
  if (actualValue && actualValue.constructor === Array) {
    for (let a = 0, maxA = actualValue.length; a < maxA; a++)
      if (lteRecursive(expectedValue, actualValue[a])) return 1;

    return 0;
  }

  const { exists, value } = actualValue;
  if (!exists || isNotNumeric(value)) return 0;
  return value <= expectedValue;
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
