/** @format */

const JQLError = require('./constructs/JQLError');

function getConstructorNames (types) {
  return types.reduce((accumulator, type) => accumulator.concat(`"${type.name}"`), []).join(', ');
}

function validateArrayOfConstructors (operatorName, valuesToValidate) {
  for (let a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    const { values, constructors } = valuesToValidate[a];

    if (values !== undefined && values !== null) {
      validateValueConstructors(
        operatorName,
        values.map(value => ({ value, constructors }))
      );
    } else {
      throw new JQLError([
        `Unexpected value passed to "${operatorName}".`,
        `Expecting an array of ["${getConstructorNames(constructors)}"].`,
        `Got "${values === undefined ? 'undefined' : 'null'}"`
      ]);
    }
  }
}

function validateValueConstructors (operatorName, valuesToValidate, throwOnNullOrUndefined) {
  for (let a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    const { value, constructors } = valuesToValidate[a];

    if (value === undefined || value === null) {
      if (throwOnNullOrUndefined) {
        throw new JQLError([
          `Unexpected argument passed to operator "${operatorName}"`,
          `Expecting [${getConstructorNames(constructors)}]`,
          `Got ${value === undefined ? 'undefined' : 'null'}`
        ]);
      }
    } else if (!constructors.includes(value.constructor)) {
      // we allow null or undefined values
      // e.g., { field: undefined }
      // e.g., { field: null }
      throw new JQLError([
        `Unexpected argument passed to operator "${operatorName}"`,
        `Expecting [${getConstructorNames(constructors)}]`,
        `Got ${value.constructor.name}`
      ]);
    }
  }
}

function validateArrayLen (operatorName, expectedValue, len) {
  if (expectedValue && expectedValue.length !== len) {
    throw new JQLError([
      `Unexpected number of arguments passed to "${operatorName}".`,
      `Expecting "${len}" arguments.`,
      `Got "${expectedValue.length}".`
    ]);
  }
}

function validateArrayLenMin (operatorName, expectedValue, min, max) {
  if (expectedValue) {
    const len = expectedValue.length;

    if (len < min || (max && len > max)) {
      throw new JQLError([
        `Unexpected number of arguments passed to "${operatorName}".`,
        `Expecting "${len}" arguments.`,
        `Got "${expectedValue.length}".`
      ]);
    }
  }
}

module.exports = {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLen,
  validateArrayLenMin
};
