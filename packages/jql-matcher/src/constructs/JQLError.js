/** @format */

function JQLError (message) {
  this.message = `JQLError: ${message.join(' ')}`;
  return this;
}

module.exports = JQLError;
