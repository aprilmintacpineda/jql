/** @format */

const JQLError = require('./constructs/JQLError');
const operations = require('./operations');

// fieldContext should not be provided
// on the first call in the recursion.
function composeOperationCallStack (query, fieldContext = []) {
  const fields = Object.keys(query);
  const len = fields.length;

  if (!len) {
    // if the fieldContext is empty, that means this is the first
    // call and the query is empty.
    if (!fieldContext.length) return [];
    throw new JQLError([
      `Unexpected empty object assigned to field ${fieldContext.join('.')}`
    ]);
  }

  let stack = [];

  for (let a = 0; a < len; a++) {
    const field = fields[a];
    const operation = operations[field];
    const payload = query[field];

    if (operation) {
      if (field !== '$or' && field !== '$and' && !fieldContext.length)
        throw new JQLError([`Unexpected use of ${field} on the root of the query.`]);

      // an operation was found, put in operations call stack
      // e.g., { $in: [1,2,3] }
      if (field === '$or' || field === '$and') {
        if (!payload || payload.constructor !== Array || !payload.length) {
          throw new JQLError([
            `Invalid value assigned to "${field}".`,
            'Expecting an non-empty "Array" of Objects.'
          ]);
        }

        let subOperationsCallStack = [];

        for (let b = 0, maxB = payload.length; b < maxB; b++) {
          const subquery = payload[b];

          if (subquery.constructor !== Object) {
            throw new JQLError([
              `Invalid value assigned to "${field}".`,
              'Expecting an non-empty "Array" of Objects.'
            ]);
          }

          subOperationsCallStack = subOperationsCallStack.concat(
            composeOperationCallStack(subquery, fieldContext)
          );
        }

        stack = stack.concat({
          operation,
          subOperationsCallStack
        });
      } else {
        if (
          (field === '$eq' || field === '$ne') &&
          payload &&
          payload.constructor === Array &&
          payload.length
        ) {
          throw new JQLError([
            `Invalid value assigned to field "${field}"`,
            `Expecting ["String", "Number", "Empty Array"] but got "${payload.constructor.name}".`
          ]);
        }

        stack = stack.concat({
          operation,
          payload,
          field: fieldContext
        });
      }
    } else {
      // the key of this object is not an operation
      // but still unknown to us
      // e.g., { field: <unknown value> }
      const fieldDepth = fieldContext.concat(field);

      // handle null or undefined equality
      // e.g., { field: null }
      // e.g., { field: undefined }
      if (payload === null || payload === undefined) {
        stack = stack.concat({
          operation: operations.$eq,
          payload,
          field: fieldDepth
        });
      } else {
        const payloadConstructor = payload.constructor;

        if (payloadConstructor === Object) {
          // this is an object, we will treat it as query
          // and continue deeper, while keeping the field depth,
          // until we reach the end or until we find an operation
          // e.g., { field: { /* more things */ } }
          stack = stack.concat(composeOperationCallStack(query[field], fieldDepth));
        } else if (
          payloadConstructor === String ||
          payloadConstructor === Number ||
          // equality to an empty array
          // e.g., { field: [] }
          (payloadConstructor === Array && !payload.length)
        ) {
          // this is an "implicit" equality operation
          // e.g., { field: 'some value' }
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
          throw new JQLError([
            `Invalid value assigned to field "${fieldDepth.join('.')}"`,
            `Expecting ["String", "Number", "Empty Array"] but got "${payloadConstructor.name}".`
          ]);
        }
      }
    }
  }

  return stack;
}

module.exports = composeOperationCallStack;
