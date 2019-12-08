# JQL-Matcher
JSON Query Language - Matcher. Filter a json-array based on a given query.

## Getting started

This library was developed and tested on Node Environment, but you can still use it for the web.

```bash
npm i -S jql-matcher
```

#### Example usage

```js
const jql = require('jql-matcher');

const data = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

// select * from list where id === 3
const query = { id: 3 };

const result = jql(query, data);
```

`jql-matcher` only accepts two arguments:

1. `query` - The query object that will be used to filter the results.
2. `data` - An `array` of `JSON` data.

## JQL Query Expressions

JQL has standard `operations` that it uses to execute this filtering process. Operation names are always prefixed with a `$` sign.

#### Example query

```js
const jql = require('jql-matcher');

const data = [
  {
    id: 1,
    email: 'user1@email.com',
    password: 'SSBjYW4gc2VlIHRoYXQgeW91IGxpa2Ugd29uZGVyaW5nIGRvd24gdGhlIHJhYmJpdCBob2xlLg=='
    watchesAnime: false,
    watchesCartoons: false,
    watchesRickAndMorty: true
  },
  {
    id: 2,
    email: 'user5@email.com',
    password: 'QXJlIHlvdSBwbGFubmluZyB0byBkZWNvZGUgYWxsIG9mIHRoZW0/',
    watchesAnime: true,
    watchesCartoons: true,
    watchesRickAndMorty: true
  },
  {
    id: 3,
    email: 'user3@email.com',
    password: 'UmVhbGx5Pw==',
    watchesAnime: false,
    watchesCartoons: true,
    watchesRickAndMorty: true
  },
  {
    id: 4,
    email: 'user2@email.com',
    password: 'SlNPTiBRdWVyeSBMYW5ndWFnZQ==',
    watchesAnime: true,
    watchesCartoons: false,
    watchesRickAndMorty: true
  }
];

// select * from users
// where
//    email === "user1@email.com" or
//    email === "user2@email.com" or
//    email === "user3@email.com"
const query = {
  email: {
    $in: ['user1@email.com', 'user2@email.com', 'user3@email.com']
  }
};

const result = jql(query, data);
```

`Operators` are abstract, therefore, there could be different approach to achieving the same result. The example above is what I would call a `good query` because it is short and precise. A bad counterpart would be

```js
const query = {
  $or: [
    { email: 'user1@email.com' },
    { email: 'user2@email.com' },
    { email: 'user3@email.com' }
  ]
};
```

The query above basically does the same thing but it's labeled as `bad` because it's unnecessarily long and complex. `JQL-Matcher` is designed and intended to be extremely performant (to a point of sacrificing a few dev experience for the sake of keeping it performant) but it should not be abused. As a general rule of thumb **ALWAYS REDUCE YOUR QUERY DOWN TO IT'S SIMPLEST FORM**. *Prefer the shortest and simplest code*.

All queries are treated as `and`, unless you explicitly use `$or`.

```js
// select * from list
// where
//    watchesAnime === true and
//    watchesCartoons === true and
//    watchesRickAndMorty === true
{
  watchesAnime: true
  watchesCartoons: true
  watchesRickAndMorty: true
}
```

PS: [Rick and Morty](https://www.adultswim.com/videos/rick-and-morty) is not a cartoon! It's a simulation.

<a href="https://www.adultswim.com/videos/rick-and-morty">
  <img src="https://github.com/aprilmintacpineda/jql/blob/master/packages/jql-matcher/memes/rick-and-morty.jpg">
</a>

#### Deep querying

*Don't be afraid to go as deep as you need to*. Given this sample data:

```js
const sampleData = [
  {
    id: 1,
    posts: {
      id: 1,
      body: 'Lorem ipsum dolor sit amet,',
      comments: [
        {
          id: 1,
          body: 'consectetur adipiscing elit.'
        }
      ]
    },
    preferences: {
      notifications: {
        outsideNotifications: {
          email: true
        }
      }
    }
  }
];
```

The query below will return all rows where `preferences.notifications.outsideNotifications.email === true`.

```js
// select * from list
// where
//    preferences.notifications.outsideNotifications.email === true
const query = {
  preferences: {
    notifications: {
      outsideNotifications: {
        email: true
      }
    }
  }
};

// ...
```

You can also filter even when a key contains an array value. The query below will return all rows if

- `preferences.notifications.outsideNotifications.email === true`
- There's a one of the comments in the posts has id of 1.

```js
// select * from list
// where
//    posts.comments has id === 1 and
//    preferences.notifications.outsideNotifications.email === true
const query = {
  posts: {
    comments: {
      id: 1
    }
  },
  preferences: {
    notifications: {
      outsideNotifications: {
        email: true
      }
    }
  }
};

// ...
```

You can do even further query where you query a value inside *an array of an array inside another giant array*.

<a href="https://www.adultswim.com/videos/rick-and-morty">
  <img src="https://github.com/aprilmintacpineda/jql/blob/master/packages/jql-matcher/memes/rick-and-morty-1.jpg">
</a>

## Operations

[docs](operations/).

## Issues

Have a question, clarification, discussion, feature request, or bug to report? File an issue.
