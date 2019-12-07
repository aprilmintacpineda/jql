const jql = require('../../src/jql');
const JQLError = require('../../src/helpers/JQLError');

const sampleData = [
  {
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
    test4: {
      test5: {
        test6: {
          test7: [
            {
              test71: 'test711',
              test72: 'test722',
              test73: 'test733'
            },
            {
              test71: 'test712',
              test72: 'test722',
              test73: 'test732'
            },
            {
              test71: 'test713',
              test72: 'test723',
              test73: 'test733'
            }
          ]
        }
      }
    },
    test8: {
      test9: {
        test10: {
          test11: 'test11',
          test12: 'test12',
          test13: 'test13',
          test14: {
            test141: 'test141',
            test142: 'test142',
            test143: 'test143'
          }
        }
      }
    }
  },
  {
    test1: 'test11',
    test2: 'test21',
    test3: 'test31',
    test4: {
      test5: {
        test6: {
          test7: [
            {
              test71: 'test7111',
              test72: 'test7212',
              test73: 'test7313'
            },
            {
              test71: 'test7112',
              test72: 'test7212',
              test73: 'test7312'
            },
            {
              test71: 'test7113',
              test72: 'test7213',
              test73: 'test7313'
            }
          ]
        }
      }
    },
    test8: {
      test9: {
        test10: {
          test11: 'test111',
          test12: 'test112',
          test13: 'test113',
          test14: {
            test141: 'test1411',
            test142: 'test1412',
            test143: 'test1413'
          }
        }
      }
    }
  }
];

describe('Operator $or', () => {
  test('throws error when given incorrect value', () => {
    expect(() => jql({
      $or: {}
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: 1
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: ''
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: '1'
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: []
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: ['']
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: [1]
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: undefined
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: null
    }, sampleData)).toThrow(JQLError);

    expect(() => jql({
      $or: [
        {
          test1: {
            $in: []
          }
        }
      ]
    }, sampleData)).toThrow(JQLError);
  });

  test('works on root', () => {
    expect(jql({
      $or: [
        { test1: 'test1' },
        { test3: 'test31' }
      ]
    }, sampleData)).toEqual(sampleData);

    expect(jql({
      $or: [
        {
          test1: {
            $in: ['test1']
          }
        },
        { test3: 'test31' }
      ]
    }, sampleData)).toEqual(sampleData);

    expect(jql({
      $or: [
        {
          test1: {
            $in: ['test1']
          }
        },
        {
          test8: {
            test9: {
              test10: {
                test11: 'test111',
                test12: 'test112',
                test13: 'test113',
                test14: {
                  test141: 'test1411',
                  test142: 'test1412',
                  test143: 'test1413'
                }
              }
            }
          }
        }
      ]
    }, sampleData)).toEqual(sampleData);
  });

  test('Works with subqueries and deep nesting', () => {
    expect(jql({
      test4: {
        test5: {
          test6: {
            test7: {
              test71: 'test7111'
            }
          }
        }
      },
      test8: {
        test9: {
          test10: {
            $or: [
              { test11: 'test111' },
              { test12: 'test112' },
              { test13: 'test113' },
              {
                test14: {
                  $or: [
                    { test141: 'test1411' },
                    { test142: 'test1412' },
                    { test143: 'test1413' }
                  ]
                }
              }
            ]
          }
        }
      }
    }, sampleData)).toEqual([sampleData[1]]);
  });

  test('Works with subqueries and deep nesting with a bit more complexity', () => {
    expect(jql({
      test4: {
        test5: {
          test6: {
            test7: {
              $or: [
                { test71: 'test7111' },
                { test72: 'test7212' },
                { test73: 'test7313' }
              ]
            }
          }
        }
      },
      test8: {
        test9: {
          test10: {
            $or: [
              { test11: 'test111' },
              { test12: 'test112' },
              { test13: 'test113' },
              {
                test14: {
                  $or: [
                    { test141: 'test1411' },
                    { test142: 'test1412' },
                    { test143: 'test1413' }
                  ]
                }
              }
            ]
          }
        }
      }
    }, sampleData)).toEqual([sampleData[1]]);
  });
});
