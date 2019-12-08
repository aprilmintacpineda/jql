# RegExp operations


- [$regex](#regex)
- [$notRegex](#notregex)

## $regex

`$regex` does `RegExp.test(field)`. It accepts a `RegExp` object.

```js
// returns all rows where the RegExp returns true
{
  field: {
    $regex: /[0-9]/gm
  }
}
```

## $notRegex

`$notRegex` does `!RegExp.test(field)`. It accepts a `RegExp` object.

```js
// returns all rows where the RegExp returns false
{
  field: {
    $notRegex: /[0-9]/gm
  }
}
```
