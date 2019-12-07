/** @format */

// ideally, or operator should only be used when
// asserting different subfields in a field
function $or (operationsCallStack, row) {
  for (let a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    const { operation, payload, field } = operationsCallStack[a];
    if (operation(payload, field, row)) return 1;
  }

  return 0;
}

// ideally, and operator should only be used when
// asserting different subfields in a field
function $and (operationsCallStack, row) {
  for (let a = 0, maxA = operationsCallStack.length; a < maxA; a++) {
    const { operation, payload, field } = operationsCallStack[a];
    if (!operation(payload, field, row)) return 0;
  }

  return 1;
}

module.exports = {
  $or,
  $and
};
