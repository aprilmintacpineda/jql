"use strict";

var operations = require('./operations');

function composeOperationCallStack(query) {
  var fieldContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fields = Object.keys(query);
  var len = fields.length;
  var stack = [];

  if (!len) {
    var message = fieldContext.length ? "Unexpected empty object assigned to field ".concat(fieldContext.join('.')) : 'Unexpected empty query.';
    throw new Error(['JQL Query Error:', message].join(' '));
  }

  for (var a = 0; a < len; a++) {
    var field = fields[a];
    var operation = operations[field];
    var payload = query[field];

    if (operation) {
      if (field === '$or' || field === '$and') {
        if (payload.constructor !== Array) {
          throw new Error(['JQL Query Error:', "Invalid value assigned to \"".concat(field, "\"."), "Expecting an \"Array\" but got ".concat(payload.constructor.name)].join(' '));
        }

        var subOperationsCallStack = [];

        for (var b = 0, maxB = payload.length; b < maxB; b++) {
          subOperationsCallStack = subOperationsCallStack.concat(composeOperationCallStack(payload[b], fieldContext));
        }

        stack = stack.concat({
          operation: operation,
          subOperationsCallStack: subOperationsCallStack
        });
      } else {
        if (field === '$eq' && payload && payload.constructor === Array && payload.length) {
          throw new Error(['JQL Query Error:', 'Invalid value assigned to field "$eq"', "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(constructor.name, "\".")].join(' '));
        }

        stack = stack.concat({
          operation: operation,
          payload: payload,
          field: fieldContext
        });
      }
    } else {
      var fieldDepth = fieldContext.concat(field);

      if (payload === null || payload === undefined) {
        stack = stack.concat({
          operation: operations.$eq,
          payload: payload,
          field: fieldDepth
        });
      } else {
        var _constructor = payload.constructor;

        if (_constructor === Object) {
          stack = stack.concat(composeOperationCallStack(query[field], fieldDepth));
        } else if (_constructor === String || _constructor === Number || _constructor === Array && !payload.length) {
          stack = stack.concat({
            operation: operations.$eq,
            payload: payload,
            field: fieldDepth
          });
        } else {
          throw new Error(['JQL Query Error:', "Invalid value assigned to field \"".concat(fieldDepth.join('.'), "\""), "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(_constructor.name, "\".")].join(' '));
        }
      }
    }
  }

  return stack;
}

module.exports = composeOperationCallStack;