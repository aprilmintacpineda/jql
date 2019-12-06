/** @format */

const composeOperationCallStack = require('./composeOperationCallStack');

function fieldReducer (accumulator, current) {
  return accumulator[current];
}

function jql (query, rows) {
  if (!rows.length) return [];

  if (query.constructor !== Object) {
    throw new Error(
      [
        'Invalid query passed to jql.',
        'Expecting an "Object".',
        `Got ${constructor.name}`
      ].join(' ')
    );
  }

  const operationsCallStack = composeOperationCallStack(query);
  const len = operationsCallStack.length;

  return rows.filter(row => {
    for (let a = 0; a < len; a++) {
      const { operation, payload, field } = operationsCallStack[a];
      const value = field.reduce(fieldReducer, row);
      if (!operation(payload, value)) return false;
    }

    return true;
  });
}

module.exports = jql;
