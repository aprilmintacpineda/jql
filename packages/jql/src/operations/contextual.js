const findValue = require('../findValue');

// ideally, or operator should only be used when
// asserting different subfields in a field
function $or (operationsCallStack, row) {
  for (let a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    const { operation, payload, field } = operationsCallStack[a];
    const value = findValue(field, row);

    if (operation(payload, value)) return true;
  }

  return false;
}

// ideally, and operator should only be used when
// asserting different subfields in a field
function $and (operationsCallStack, row) {
  for (let a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    const { operation, payload, field } = operationsCallStack[a];
    const value = findValue(field, row);
    if (!operation(payload, value)) return false;
  }

  return true;
}

module.exports = {
  $or,
  $and
};
