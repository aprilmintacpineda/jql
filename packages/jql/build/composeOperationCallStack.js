"use strict";

var throwError = require('./helpers/throwError');

var operations = require('./operations');

function composeOperationCallStack(query) {
  var fieldContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fields = Object.keys(query);
  var len = fields.length;

  if (!len) {
    if (!fieldContext.length) return [];
    throwError(['JQL Query Error:', "Unexpected empty object assigned to field ".concat(fieldContext.join('.'))]);
  }

  var stack = [];

  for (var a = 0; a < len; a++) {
    var field = fields[a];
    var operation = operations[field];
    var payload = query[field];

    if (operation) {
      if (field !== '$or' && field !== '$and' && !fieldContext.length) throwError(['JQL Query Error:', "Unexpected use of ".concat(field, " on the root of the query.")]);

      if (field === '$or' || field === '$and') {
        if (!payload || payload.constructor !== Array || !payload.length) {
          throwError(['JQL Query Error:', "Invalid value assigned to \"".concat(field, "\"."), 'Expecting an non-empty "Array" of Objects.']);
        }

        var subOperationsCallStack = [];

        for (var b = 0, maxB = payload.length; b < maxB; b++) {
          var subquery = payload[b];

          if (subquery.constructor !== Object) {
            throwError(['JQL Query Error:', "Invalid value assigned to \"".concat(field, "\"."), 'Expecting an non-empty "Array" of Objects.']);
          }

          subOperationsCallStack = subOperationsCallStack.concat(composeOperationCallStack(subquery, fieldContext));
        }

        stack = stack.concat({
          operation: operation,
          subOperationsCallStack: subOperationsCallStack
        });
      } else {
        if ((field === '$eq' || field === '$ne') && payload && payload.constructor === Array && payload.length) {
          throwError(['JQL Query Error:', "Invalid value assigned to field \"".concat(field, "\""), "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(constructor.name, "\".")]);
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
          throwError(['JQL Query Error:', "Invalid value assigned to field \"".concat(fieldDepth.join('.'), "\""), "Expecting [\"String\", \"Number\", \"Empty Array\"] but got \"".concat(_constructor.name, "\".")]);
        }
      }
    }
  }

  return stack;
}

module.exports = composeOperationCallStack;