function findValue (depth, current) {
  let value = current;
  const _depth = [].concat(depth);

  for (let a = 0, maxA = _depth.length; a < maxA; a++) {
    const depthValue = value[_depth.shift()];

    // depthValue is now falsy,
    // false, undefined, null, ''
    if (!depthValue) return depthValue;

    // Query by a child that's assigned an array
    if (depthValue.constructor === Array)
      return depthValue.map(v => findValue(_depth, v));

    value = depthValue;
  }

  return value;
}

module.exports = findValue;
