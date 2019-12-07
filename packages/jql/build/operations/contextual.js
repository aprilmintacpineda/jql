"use strict";

var findValue = require('../findValue');

function $or(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var _operationsCallStack$ = operationsCallStack[a],
        operation = _operationsCallStack$.operation,
        payload = _operationsCallStack$.payload,
        field = _operationsCallStack$.field;
    var value = findValue(field, row);
    if (operation(payload, value)) return true;
  }

  return false;
}

function $and(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var _operationsCallStack$2 = operationsCallStack[a],
        operation = _operationsCallStack$2.operation,
        payload = _operationsCallStack$2.payload,
        field = _operationsCallStack$2.field;
    var value = findValue(field, row);
    if (!operation(payload, value)) return false;
  }

  return true;
}

module.exports = {
  $or: $or,
  $and: $and
};