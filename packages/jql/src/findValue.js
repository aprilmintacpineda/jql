/** @format */

const JQLValue = require('./constructs/JQLValue');

function findValue (depth, current) {
  let value = current;
  const _depth = [].concat(depth);

  for (let a = 0, maxA = _depth.length; a < maxA; a++) {
    if (value.constructor !== Object) break;

    const key = _depth.shift();
    if (!(key in value)) return new JQLValue(undefined, false);
    const depthValue = value[key];

    // false, undefined, null, ''
    if (!depthValue) return new JQLValue(depthValue, true);

    // Query by a child that's assigned an array
    if (depthValue.constructor === Array) {
      if (!depthValue.length) return new JQLValue(depthValue, true);
      return depthValue.map(v => findValue(_depth, v));
    }

    value = depthValue;
  }

  return new JQLValue(value, true);
}

module.exports = findValue;
