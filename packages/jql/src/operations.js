/** @format */

const {
  validator,
  validatorTypes: { validateExValConstructor }
} = require('./validateArgs');

function $eq (expectedValue, actualValue) {
  return expectedValue === actualValue;
}

function $ne (expectedValue, actualValue) {
  return expectedValue !== actualValue;
}

function $or (operationsCallStack, jsonData) {
  console.log('$or');
  return false;
}

function $and (queries, jsonData) {
  console.log('$and');
  return true;
}

function $in (expectedValue, actualValue) {
  return expectedValue.includes(actualValue);
}

function $notIn (expectedValue, actualValue) {
  return !expectedValue.includes(actualValue);
}

function $gt (expectedValue, actualValue) {
  return expectedValue > actualValue;
}

function $gte (expectedValue, actualValue) {
  return expectedValue >= actualValue;
}

function $lt (expectedValue, actualValue) {
  return actualValue < expectedValue;
}

function $lte (expectedValue, actualValue) {
  return actualValue <= expectedValue;
}

function $regex (expectedValue, actualValue) {
  return expectedValue.test(actualValue);
}

function $notRegex (expectedValue, actualValue) {
  return !expectedValue.test(actualValue);
}

function $between ([min, max], actualValue) {
  return actualValue > min && actualValue < max;
}

function $notBetween ([min, max], actualValue) {
  return actualValue < min || actualValue > max;
}

module.exports = {
  $eq: validator($eq, [[validateExValConstructor, [String, Number]]]),
  $or,
  $and,
  $in: validator($in, [[validateExValConstructor, [Array]]]),
  $notIn: validator($notIn, [[validateExValConstructor, [Array]]]),
  $ne: validator($ne, [[validateExValConstructor, [String, Number]]]),
  $gt: validator($gt, [[validateExValConstructor, [Number]]]),
  $gte: validator($gte, [[validateExValConstructor, [Number]]]),
  $lt: validator($lt, [[validateExValConstructor, [Number]]]),
  $lte: validator($lte, [[validateExValConstructor, [Number]]]),
  $regex: validator($regex, [[validateExValConstructor, [RegExp]]]),
  $notRegex: validator($notRegex, [[validateExValConstructor, [RegExp]]]),
  $between: validator($between, [[validateExValConstructor, [Array]]]),
  $notBetween: validator($notBetween, [[validateExValConstructor, [Array]]])
};
