const jql = require('../../src/jql');
const JQLError = require('../../src/errors/JQLError');
const sampleData = require('./sampleData');

describe('Query', () => {
  it('throws error when given a not valid query', () => {
    expect(() => jql([], sampleData)).toThrow(JQLError);
    expect(() => jql(1, sampleData)).toThrow(JQLError);
    expect(() => jql(Symbol(), sampleData)).toThrow(JQLError);
    expect(() => jql('a', sampleData)).toThrow(JQLError);
    expect(() => jql('', sampleData)).toThrow(JQLError);
    expect(() => jql(undefined, sampleData)).toThrow(JQLError);
    expect(() => jql(null, sampleData)).toThrow(JQLError);
  });

  it('returns all rows when given an empty query', () => {
    expect(jql({}, sampleData)).toEqual(sampleData);
  });

  it('returns empty array when given an empty list', () => {
    expect(jql({ something: 'something' }, [])).toEqual([]);
  });
});
