/** @format */

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
      throw new Error(
        [
          'JQL Query Error:',
          `Unexpected value passed to "${operatorName}".`,
          `Expecting an array of ["${getConstructorNames(constructors)}"].`,
          `Got "${values === undefined ? 'undefined' : 'null'}"`
        ].join(' ')
      );
    }
  }
}

function validateValueConstructors (operatorName, valuesToValidate, throwOnNullOrUndefined) {
  for (let a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    const { value, constructors } = valuesToValidate[a];

    if (value === undefined || value === null) {
      if (throwOnNullOrUndefined) {
        throw new Error(
          [
            `Unexpected argument passed to operator "${operatorName}"`,
            `Expecting [${getConstructorNames(constructors)}]`,
            `Got ${value === undefined ? 'undefined' : 'null'}`
          ].join(' ')
        );
      }
    } else if (!constructors.includes(value.constructor)) {
      // we allow null or undefined values
      // e.g., { field: undefined }
      // e.g., { field: null }
      throw new Error(
        [
          `Unexpected argument passed to operator "${operatorName}"`,
          `Expecting [${getConstructorNames(constructors)}]`,
          `Got ${value.constructor.name}`
        ].join(' ')
      );
    }
  }
}

function validateArrayLen (operatorName, expectedValue, len) {
  if (expectedValue && expectedValue.length !== len) {
    throw new Error(
      [
        `Unexpected number of arguments passed to "${operatorName}".`,
        `Expecting "${len}" arguments.`,
        `Got "${expectedValue.length}".`
      ].join(' ')
    );
  }
}

function validateArrayLenMin (operatorName, expectedValue, min, max) {
  if (expectedValue) {
    const len = expectedValue.length;

    if (len < min || (max && len > max)) {
      throw new Error(
        [
          `Unexpected number of arguments passed to "${operatorName}".`,
          `Expecting "${len}" arguments.`,
          `Got "${expectedValue.length}".`
        ].join(' ')
      );
    }
  }
}

module.exports = {
  validateValueConstructors,
  validateArrayOfConstructors,
  validateArrayLen,
  validateArrayLenMin
};
