"use strict";

var JQLError = require('./errors/JQLError');

var operations = require('./operations');

function composeOperationCallStack(query) {
  var fieldContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fields = Object.keys(query);
  var len = fields.length;

  if (!len) {
    if (!fieldContext.length) return [];
    throw new JQLError(["Unexpected empty object assigned to field ".concat(fieldContext.join('.'))]);
  }

  var stack = [];

  for (var a = 0; a < len; a++) {
    var field = fields[a];
    var operation = operations[field];
    var payload = query[field];

    if (operation) {
      if (field !== '$or' && field !== '$and' && !fieldContext.length) throw new JQLError(["Unexpected use of ".concat(field, " on the root of the query.")]);

      if (field === '$or' || field === '$and') {
        if (!payload || payload.constructor !== Array || !payload.length) {
          throw new JQLError(["Invalid value assigned to \"".concat(field, "\"."), 'Expecting an non-empty "Array" of Objects.']);
        }

        var subOperationsCallStack = [];

        for (var b = 0, maxB = payload.length; b < maxB; b++) {
          var subquery = payload[b];

          if (subquery.constructor !== Object) {
            throw new JQLError(["Invalid value assigned to \"".concat(field, "\"."), 'Expecting an non-empty "Array" of Objects.']);
          }

          subOperationsCallStack = subOperationsCallStack.concat(composeOperationCallStack(subquery, fieldContext));
        }

        stack = stack.concat({
          operation: operation,
          subOperationsCallStack: subOperationsCallStack
        });
      } else {
        if ((field === '$eq' || field === '$ne') && payload && payload.constructor === Array && payload.length) {
          throw new JQLError(["Invalid value assigned to field \"".concat(field, "\""), "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(payload.constructor.name, "\".")]);
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
        var payloadConstructor = payload.constructor;

        if (payloadConstructor === Object) {
          stack = stack.concat(composeOperationCallStack(query[field], fieldDepth));
        } else if (payloadConstructor === String || payloadConstructor === Number || payloadConstructor === Array && !payload.length) {
          stack = stack.concat({
            operation: operations.$eq,
            payload: payload,
            field: fieldDepth
          });
        } else {
          throw new JQLError(["Invalid value assigned to field \"".concat(fieldDepth.join('.'), "\""), "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(payloadConstructor.name, "\".")]);
        }
      }
    }
  }

  return stack;
}

module.exports = composeOperationCallStack;