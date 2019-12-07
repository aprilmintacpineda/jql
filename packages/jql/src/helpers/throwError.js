const JQLError = require('./JQLError');

function throwError (errorMessageArray) {
  throw new JQLError(errorMessageArray.join(' '));
}

module.exports = throwError;
