# jql
JSON Query Language - JSON as a database

JQL is a framework (that I'm building for fun) that enables you to perform CRUD operations, that are similar to CRUD operations of a database, to a json data.

JQL is was based on SQL, except it's built and designed for JS.

## The end goal

The goal of JQL is to enable you to use JSON as a database that is:

- Flexible, does not impose any design preferences. That is,
  - It does not force the user to design the database in a relational way, where you have multiple tables and each tables could be related to each other, but provides it as an option.
  - It does not force the user to design the database in a non-relational way, where you will have only a single table and could be repeating for each row.
- Performant even on huge data.
- Supports some, if not all, standard database operations (pagination with offset and limit, count, like, etc.)
- Has JS-friendly query operations.
- Runs with hooks (before mutations, after mutations, etc), as an opt-in library.
- Supports subscriptions, as an opt-in library.
- Users can define their own `operation`. Operations are similar to store procedure, predefined functions that allow you to add custom filters.

## Packages

JQL is divided into different packages that could be used independently of each other, for example if you only want to be able to query a JSON-array, then you can use the [JQL-Matcher](https://github.com/aprilmintacpineda/jql/tree/master/packages/jql-matcher) package that powers the `query` of JQL.

- [JQL-Matcher](https://github.com/aprilmintacpineda/jql/tree/master/packages/jql-matcher) A library that enables you to filter a json-array based on a query.
