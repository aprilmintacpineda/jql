# Range operations

- [$between](#between)
- [$notBetween](#notbetween)
- [$iBetween](#ibetween)
- [$iNotBetween](#inotbetween)

# $between

`$between` does `min < field && max > field`. It accepts an `Array` of `[min, max]` where `min` and `max` are `Number`s.

```js
{
  field: {
    $between: [17, 25]
  }
}
```

# $iBetween

`$between` does `min <= field && max >= field`. It accepts an `Array` of `[min, max]` where `min` and `max` are `Number`s.

```js
{
  field: {
    $between: [17, 25]
  }
}
```

# $notBetween

`$between` does `!(min <= field && max >= field)`. It accepts an `Array` of `[min, max]` where `min` and `max` are `Number`s.

```js
{
  field: {
    $between: [17, 25]
  }
}
```

# $iNotBetween

`$between` does `!(min <= field && max >= field)`. It accepts an `Array` of `[min, max]` where `min` and `max` are `Number`s.

```js
{
  field: {
    $between: [17, 25]
  }
}
```
