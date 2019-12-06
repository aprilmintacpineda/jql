/** @format */

const composeOperationCallStack = require('./composeOperationCallStack');

function findValue (depth, current) {
  let value = current;
  const _depth = [].concat(depth);

  for (let a = 0, maxA = _depth.length; a < maxA; a++) {
    const depthValue = value[_depth.shift()];

    if (!depthValue) return undefined;
    if (depthValue.constructor === Array)
      return depthValue.map(v => findValue(_depth, v));

    value = depthValue;
  }

  return value;
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
      const value = findValue(field, row);

      if (value.constructor === Array) {
        for (let b = 0, maxB = value.length; b < maxB; b++)
          if (operation(payload, value[b])) return true;

        return false;
      }

      if (!operation(payload, value)) return false;
    }

    return true;
  });
}

module.exports = jql;
