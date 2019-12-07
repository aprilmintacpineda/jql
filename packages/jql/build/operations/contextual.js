"use strict";

function $or(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var operationCall = operationsCallStack[a];

    if ('subOperationsCallStack' in operationCall) {
      var operation = operationCall.operation,
          subOperationsCallStack = operationCall.subOperationsCallStack;
      if (operation(subOperationsCallStack, row)) return 1;
    } else {
      var _operationsCallStack$ = operationsCallStack[a],
          _operation = _operationsCallStack$.operation,
          payload = _operationsCallStack$.payload,
          field = _operationsCallStack$.field;
      if (_operation(payload, field, row)) return 1;
    }
  }

  return 0;
}

function $and(operationsCallStack, row) {
  for (var a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    var operationCall = operationsCallStack[a];

    if ('subOperationsCallStack' in operationCall) {
      var operation = operationCall.operation,
          subOperationsCallStack = operationCall.subOperationsCallStack;
      if (!operation(subOperationsCallStack, row)) return 0;
    } else {
      var _operationsCallStack$2 = operationsCallStack[a],
          _operation2 = _operationsCallStack$2.operation,
          payload = _operationsCallStack$2.payload,
          field = _operationsCallStack$2.field;
      if (!_operation2(payload, field, row)) return 0;
    }
  }

  return 1;
}

module.exports = {
  $or: $or,
  $and: $and
};