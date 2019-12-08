# Logical operations

- [$and](#and)
- [$or](#or)
- [Foot notes](#foot-notes)
  - [Logical operator trap](#logical-operator-trap)

## $and

`$and` does `operation && operation && operation` calls. It does exactly what the `and` logical operator in javascript does. It accepts an `Array` of queries.

```js
// return all rows where
//    field1.field1_subfield2.subfield2_subfield1 === 1 and
//    field2 !== 2 and
//    (
//      field 3 === 1 or
//      field 3 === 2 or
//      field 3 === 3 or
//      field 3 === 4
//    )
{
  $and: [
    {
      field1: {
        field1_subfield2: {
          subfield2_subfield1: 1
        }
      }
    },
    {
      field2: {
        $ne: 2
      }
    },
    {
      field3: {
        $in: [1,2,3,4]
      }
    }
  ]
}
```

## $or

`$or` does `operation || operation || operation` calls. It does exactly what the `or` logical operator in javascript does. It accepts an `Array` of queries.

```js
// return all rows where
//    field1.field1_subfield2.subfield2_subfield1 === 1 or
//    field2 !== 2 or
//    field 3 === 1 or
//    field 3 === 2 or
//    field 3 === 3 or
//    field 3 === 4
{
  $or: [
    {
      field1: {
        field1_subfield2: {
          subfield2_subfield1: 1
        }
      }
    },
    {
      field2: {
        $ne: 2
      }
    },
    {
      field3: {
        $in: [1,2,3,4]
      }
    }
  ]
}
```

# Foot notes

## logical operator trap

You should know when to use and when not to use logical operators. You must avoid the **logical operator trap**. The examples given in this docs may not be real-world examples (as of yet, but it will be as the library progress), in the first example in [$and](#and) operation, it could be reduced down to:

```js
{
  {
    field1: {
      field1_subfield2: {
        subfield2_subfield1: 1
      }
    }
  },
  {
    field2: {
      $ne: 2
    }
  },
  {
    field3: {
      $in: [1,2,3,4]
    }
  }
}
```

The two queries give you the same result, but this query is more optimized and also the simplest. As a general rule of thumb **ALWAYS REDUCE YOUR QUERY DOWN TO IT'S SIMPLEST FORM**. *Prefer the shortest and simplest code*.
