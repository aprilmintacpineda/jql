# List of operations

The following are the built-in operations that you can use out of the box. Generally speaking, the structure is as follows:

```js
{
  field: {
    $operation: expectedValue
  }
}
```

- `field` is the field you want to check.
- `$operation` is the operations's name.
- `expectedValue` is the value you want to expect to be in the filtered result. Each operation expects different value such as `Array`, `Number`, `String`. Some operations accept `undefined` and `null`.

# Built in operations

- [Equality operations](equality.md)
  - [$eq](equality.md#eq-equal)
  - [$ne](equality.md#ne-not-equal)
  - [$gt](equality.md#gt-greater-than)
  - [$gte](equality.md#gte-greater-than-or-equal-to)
  - [$lt](equality.md#lt-less-than)
  - [$lte](equality.md#lte-less-than-or-equal-to)
- [Range operations](range.md)
- [$between](range.md#between)
- [$notBetween](range.md#notbetween)
- [$iBetween](range.md#ibetween)
- [$iNotBetween](range.md#inotbetween)
