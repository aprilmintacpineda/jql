"use strict";

function getConstructorNames(types) {
  return types.reduce(function (accumulator, type) {
    return accumulator.concat("\"".concat(type.name, "\""));
  }, []).join(', ');
}

function validateArrayOfConstructors(operatorName, valuesToValidate) {
  var _loop = function _loop(a, maxA) {
    var _valuesToValidate$a = valuesToValidate[a],
        values = _valuesToValidate$a.values,
        constructors = _valuesToValidate$a.constructors;

    if (values !== undefined && values !== null) {
      validateValueConstructors(operatorName, values.map(function (value) {
        return {
          value: value,
          constructors: constructors
        };
      }));
    } else {
      throw new Error(['JQL Query Error:', "Unexpected value passed to \"".concat(operatorName, "\"."), "Expecting an array of [\"".concat(getConstructorNames(constructors), "\"]."), "Got \"".concat(values === undefined ? 'undefined' : 'null', "\"")].join(' '));
    }
  };

  for (var a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    _loop(a, maxA);
  }
}

function validateValueConstructors(operatorName, valuesToValidate, throwOnNullOrUndefined) {
  for (var a = 0, maxA = valuesToValidate.length; a < maxA; a++) {
    var _valuesToValidate$a2 = valuesToValidate[a],
        value = _valuesToValidate$a2.value,
        constructors = _valuesToValidate$a2.constructors;

    if (value === undefined || value === null) {
      if (throwOnNullOrUndefined) {
        throw new Error(["Unexpected argument passed to operator \"".concat(operatorName, "\""), "Expecting [".concat(getConstructorNames(constructors), "]"), "Got ".concat(value === undefined ? 'undefined' : 'null')].join(' '));
      }
    } else if (!constructors.includes(value.constructor)) {
      throw new Error(["Unexpected argument passed to operator \"".concat(operatorName, "\""), "Expecting [".concat(getConstructorNames(constructors), "]"), "Got ".concat(value.constructor.name)].join(' '));
    }
  }
}

function validateArrayLen(operatorName, expectedValue, len) {
  if (expectedValue && expectedValue.length !== len) {
    throw new Error(["Unexpected number of arguments passed to \"".concat(operatorName, "\"."), "Expecting \"".concat(len, "\" arguments."), "Got \"".concat(expectedValue.length, "\".")].join(' '));
  }
}

module.exports = {
  validateValueConstructors: validateValueConstructors,
  validateArrayLen: validateArrayLen,
  validateArrayOfConstructors: validateArrayOfConstructors
};