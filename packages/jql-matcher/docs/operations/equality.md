# Equality operations

- [$eq](#eq-equal)
- [$ne](#ne-not-equal)
- [$gt](#gt-greater-than)
- [$gte](#gte-greater-than-or-equal-to)
- [$lt](#lt-less-than)
- [$lte](#lte-less-than-or-equal-to)

## $eq (Equal)

`$eq` does `value1 === value2`. It's the only operator that comes with an `implicit` implementation, that is, you can leave it out like this:

```js
// return all rows where field === "value"
{ field: 'value' }
```

Or you could use the `explicit` counterpart:

```js
// return all rows where field === "value"
{
  field: { $eq: 'value' }
}
```

`$eq` accepts `empty array`, `Number`, `String`, `null`, `undefined`.

```js
// return all rows where field === "value"
jql({ field: 'value' }, rows);

// return all rows where field === undefined or field does not exist in the Object
jql({ field: undefined }, rows);

// return all rows where field === null
jql({ field: null }, rows);

// return all rows where field === `empty array`
jql({ field: [] }, rows);
```

## $ne (Not Equal)

`$ne` does `value1 !== value2`.

```js
// return all rows where field !== "value"
{
  field: { $ne: 'value' }
}
```

`$ne` accepts `empty array`, `Number`, `String`, `null`, `undefined`.

```js
// return all rows where field !== "value"
jql(
  {
    field: { $ne: 'value' }
  },
  rows
);

// return all rows where field !== undefined
jql(
  {
    field: { $ne: undefined }
  },
  rows
);

// return all rows where field !== null
jql(
  {
    field: { $ne: null }
  },
  rows
);

// return all rows where field !== `empty array`
jql(
  {
    field: { $ne: [] }
  },
  rows
);
```

## $gt (Greater-than)

`$gt` does `value > expectedValue`. It only accepts `Number`.


```js
// return all rows where field !== null
jql(
  {
    field: { $gt: 17 }
  },
  rows
);
```

## $gte (Greater-than or Equal-to)

`$gte` does `value >= expectedValue`. It only accepts `Number`.


```js
// return all rows where field !== null
jql(
  {
    field: { $gte: 18 }
  },
  rows
);
```

## $lt (Less-than)

`$lt` does `value < expectedValue`. It only accepts `Number`.


```js
// return all rows where field !== null
jql(
  {
    field: { $lt: 25 }
  },
  rows
);
```

## $lte (Less-than or Equal-to)

`$lte` does `value <= expectedValue`. It only accepts `Number`.


```js
// return all rows where field !== null
jql(
  {
    field: { $lte: 24 }
  },
  rows
);
```
