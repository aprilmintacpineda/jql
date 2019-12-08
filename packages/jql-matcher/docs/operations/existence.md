# Existence operations

- [$in](#in)
- [$notIn](#notin)
- [$iIn](#iin)
- [$iNotIn](#inotin)

# $in

`$in` does `[1,2,3,4,5].includes(field)`. It accepts an `Array` of `String`s and/or `Number`s.

```js
{
  field: {
    $in: [1, 2, 3, 'a', 'b', 'c']
  }
}
```

# $notIn

`$notIn` does `![1,2,3,4,5].includes(field)`. It accepts an `Array` of `String`s and/or `Number`s.

```js
{
  field: {
    $notIn: [1, 2, 3, 'a', 'b', 'c']
  }
}
```

# $iIn

`$iIn` is the `case-insensitive` version of `$in`, because it's `case-insensitive`, it does `.toString().toLowerCase()` on all values.

```js
{
  field: {
    $iIn: [1, 2, 3, 'a', 'b', 'c']
  }
}
```

# $iNotIn

`$iNotIn` is the `case-insensitive` version of `$notIn`, because it's `case-insensitive`, it does `.toString().toLowerCase()` on all values.

```js
{
  field: {
    $iNotIn: [1, 2, 3, 'a', 'b', 'c']
  }
}
```
