const operations = require('./operations');

// fieldContext should not be provided
// on the first call in the recursion.
function composeOperationCallStack (query, fieldContext = []) {
  const fields = Object.keys(query);
  const len = fields.length;
  let stack = [];

  if (!len) {
    const message = fieldContext.length
      ? `Unexpected empty object assigned to field ${fieldContext.join('.')}`
      : 'Unexpected empty query.';

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
      // an operation was found, put in operations call stack
      // e.g., $in: [1,2,3]
      stack = stack.concat({
        operation,
        payload,
        field: fieldContext
      });
    } else {
      // the key of this object is not an operation
      // but still unknown to us
      // e.g., field: <unknown value>
      const fieldDepth = fieldContext.concat(field);
      const { constructor } = payload;

      if (constructor === Object) {
        // this is an object, we will treat it as query
        // and continue deeper, while keeping the field depth,
        // until we reach the end or until we find an operation
        // e.g., field: { /* more things */ }
        stack = stack.concat(
          composeOperationCallStack(query[field], fieldDepth)
        );
      } else if (constructor === String || constructor === Number) {
        // this is an "implicit" equality operation
        // e.g., field: 'some value'
        stack = stack.concat({
          operation: operations.$eq,
          payload,
          field: fieldDepth
        });
      } else {
        // we have no idea what this is, could be:
        // field: [ /* some value */ ] <-- invalid
        // field: Symbol() <-- invalid
        // etc...
        throw new Error(
          [
            'JQL Query Error:',
            `Invalid value assigned to field "${fieldDepth.join('.')}"`,
            `Expecting "String" or "Number" but got "${constructor.name}".`
          ].join(' ')
        );
      }
    }
  }

  return stack;
}

module.exports = composeOperationCallStack;
