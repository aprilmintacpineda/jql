"use strict";

var findValue = require('./findValue');

var composeOperationCallStack = require('./composeOperationCallStack');

function jql(query, rows) {
  if (!rows.length) return [];

  if (query.constructor !== Object) {
    throw new Error(['Invalid query passed to jql.', 'Expecting an "Object".', "Got ".concat(constructor.name)].join(' '));
  }

  var operationsCallStack = composeOperationCallStack(query);
  var len = operationsCallStack.length;
  return rows.filter(function (row) {
    for (var a = 0; a < len; a++) {
      var operationCall = operationsCallStack[a];

      if ('subOperationsCallStack' in operationCall) {
        var _operation = operationCall.operation,
            subOperationsCallStack = operationCall.subOperationsCallStack;
        return _operation(subOperationsCallStack, row);
      }

      var operation = operationCall.operation,
          payload = operationCall.payload,
          field = operationCall.field;
      var value = findValue(field, row);

      if (value && value.constructor === Array && payload && payload.constructor !== Array) {
        for (var b = 0, maxB = value.length; b < maxB; b++) {
          if (operation(payload, value[b])) return true;
        }

        return false;
      }

      if (!operation(payload, value)) return false;
    }

    return true;
  });
}

module.exports = jql;