/** @format */

function getConstructorNames (types) {
  return types.reduce((accumulator, type) => accumulator.concat(`"${type.name}"`), []).join(', ');
}

function validateArrayOfConstructors (operatorName, valuesToValidate) {
  for (let a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    const { values, constructors } = valuesToValidate[a];

    if (values) {
      validateValueConstructors(
        operatorName,
        values.map(value => ({ value, constructors }))
      );
    }
  }
}

function validateValueConstructors (operatorName, valuesToValidate) {
  for (let a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    const { value, constructors } = valuesToValidate[a];

    // we allow null or undefined values
    // e.g., { field: undefined }
    // e.g., { field: null }
    if (value && !constructors.includes(value.constructor)) {
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

module.exports = {
  validateValueConstructors,
  validateArrayLen,
  validateArrayOfConstructors
};
