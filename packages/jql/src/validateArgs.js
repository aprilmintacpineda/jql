/** @format */

function getConstructorNames (types) {
  return types.reduce((accumulator, type) => accumulator.concat(`"${type.name}"`), []).join(', ');
}

const validators = {
  validateExValConstructor (operatorName, expectedValue, actualValue, ...expectedValueTypes) {
    if (!expectedValueTypes.includes(expectedValue.constructor)) {
      const errorMessage = [`Unexpected argument passed to ${operatorName}.`];

      if (expectedValueTypes.length === 1)
        errorMessage.push(`Expected "${expectedValueTypes[0].name}"`);
      else errorMessage.push(`Expected on of ${getConstructorNames(expectedValueTypes)}`);

      errorMessage.push(`Got ${expectedValue.constructor.name}`);

      throw new Error(errorMessage.join(' '));
    }
  },
  validateExValLen (operatorName, expectedValue, actualValue, len) {
    if (expectedValue.length !== len) {
      throw new Error(
        [
          `Unexpected number of arguments passed to "${operatorName}".`,
          `Expecting "${len}" arguments.`,
          `Got "${expectedValue.length}".`
        ].join(' ')
      );
    }
  }
};

function validator (operator, validatorsToCall) {
  return function validateArgs (expectedValue, actualValue) {
    for (let a = 0, maxA = validatorsToCall.length; a < maxA; a++) {
      const [validator, args] = validatorsToCall[a];
      validators[validator](operator.name, expectedValue, actualValue, ...args);
    }

    return operator(expectedValue, actualValue);
  };
}

module.exports = {
  validator,
  validatorTypes: {
    validateExValConstructor: 'validateExValConstructor'
  }
};
