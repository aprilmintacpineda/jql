"use strict";

function JQLError(message) {
  this.message = "JQLError: ".concat(message.join(' '));
  return this;
}

module.exports = JQLError;