/** @format */

function isNotNumeric (value) {
  return value === undefined || value === null || isNaN(value);
}

module.exports = { isNotNumeric };
