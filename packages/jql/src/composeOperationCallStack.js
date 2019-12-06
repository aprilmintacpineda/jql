const operations = require('./operations');

function operationsCallStackComposer (query, fieldContext = []) {
  const fields = Object.keys(query);
  const len = fields.length;
  let stack = [];

  if (!len) {
    let message = fieldContext.length
      ? `Unexpected empty object assigned to field ${fieldContext.join('.')}`
      : `Unexpected empty query.`;

    throw new Error(
      [
        'JQL Query Error:',
        message
      ].join(' ')
    );
  }

  for (let a = 0; a < len; a++) {
    const field = fields[a];
    const operation = operations[field];
    const payload = query[field];

    if (operation) {
      stack = stack.concat({
        operation,
        payload,
        field: fieldContext
      });
    } else {
      const fieldDepth = fieldContext.concat(field);
      const { constructor } = payload;

      if (constructor === Object) {
        stack = stack.concat(
          operationsCallStackComposer(query[field], fieldDepth)
        );
      } else if (constructor === String || constructor === Number) {
        stack = stack.concat({
          operation: operations.$eq,
          payload,
          field: fieldDepth
        });
      } else {
        throw new Error(
          [
            'JQL Query Error:',
            `Invalid value assigned to field "${fieldDepth.join('.')}"`,
            `Expecting "String", or "Number" but got "${constructor.name}".`,
          ].join(' ')
        );
      }
    }

    // const fieldValue = query[field];
    // const fieldConstructor = fieldValue.constructor;
  }

  return stack;
}

function composeOperationCallStack (query) {
  return operationsCallStackComposer(query);
}

module.exports = composeOperationCallStack;
