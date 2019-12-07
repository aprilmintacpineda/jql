"use strict";

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
      if (!operation(payload, field, row)) return 0;
    }

    return 1;
  });
}

module.exports = jql;