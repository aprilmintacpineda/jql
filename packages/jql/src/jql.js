/** @format */

const composeOperationCallStack = require('./composeOperationCallStack');

function jql (query, rows) {
  if (!rows.length) return [];

  if (query.constructor !== Object) {
    throw new Error(
      ['Invalid query passed to jql.', 'Expecting an "Object".', `Got ${constructor.name}`].join(
        ' '
      )
    );
  }

  // Operation call stack describes the different operations
  // that the query will perform, defined in operations.js
  const operationsCallStack = composeOperationCallStack(query);
  const len = operationsCallStack.length;

  // filter rows based on operations
  return rows.filter(row => {
    // all root operations should return true
    // for this row to be included in the results
    for (let a = 0; a < len; a++) {
      const operationCall = operationsCallStack[a];

      if ('subOperationsCallStack' in operationCall) {
        const { operation, subOperationsCallStack } = operationCall;
        return operation(subOperationsCallStack, row);
      }

      const { operation, payload, field } = operationCall;
      if (!operation(payload, field, row)) return false;
    }

    return true;
  });
}

module.exports = jql;
