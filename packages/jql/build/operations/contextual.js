"use strict";

function $or(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var _operationsCallStack$ = operationsCallStack[a],
        operation = _operationsCallStack$.operation,
        payload = _operationsCallStack$.payload,
        field = _operationsCallStack$.field;
    if (operation(payload, field, row)) return 1;
  }

  return 0;
}

function $and(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var _operationsCallStack$2 = operationsCallStack[a],
        operation = _operationsCallStack$2.operation,
        payload = _operationsCallStack$2.payload,
        field = _operationsCallStack$2.field;
    if (!operation(payload, field, row)) return 0;
  }

  return 1;
}

module.exports = {
  $or: $or,
  $and: $and
};