/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/errors/JQLError');

const sampleData = [
  {
    test1: 'TEST1',
    test2: 'TEST2',
    test3: 'TEST3',
    test4: {
      test5: {
        test6: {
          test7: 'TEST4'
        }
      }
    },
    test8: [{ test8_1: 'TEST8_1' }, { test8_1: 'TEST8_2' }, { test8_1: 'TEST8_3' }]
  },
  {
    test1: 'TEST11',
    test2: 'TEST21',
    test3: 'TEST31',
    test4: {
      test5: {
        test6: {
          test7: 'TEST41'
        }
      }
    },
    test8: [{ test8_1: 'TEST8_11' }, { test8_1: 'TEST8_21' }, { test8_1: 'TEST8_31' }]
  }
];

describe('Operator $iNotIn', () => {
  test('throws error when given wrong value', () => {
    expect(() =>
      jql(
        {
          test1: {
            $iNotIn: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $iNotIn: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $iNotIn: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $iNotIn: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $iNotIn: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  test('handles deep nesting and arrays', () => {
    const query = {
      test1: {
        $iNotIn: ['test11', 'test12', 'test13']
      },
      test2: {
        $iNotIn: ['test11', 'test21', 'test13']
      },
      test3: {
        $iNotIn: ['test11', 'test21', 'test31']
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $iNotIn: ['test11', 'test21', 'test13', 'test41']
            }
          }
        }
      },
      test8: {
        test8_1: {
          $iNotIn: ['test8_11', 'test8_12', 'test8_13']
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([
      {
        test1: 'TEST1',
        test2: 'TEST2',
        test3: 'TEST3',
        test4: {
          test5: {
            test6: {
              test7: 'TEST4'
            }
          }
        },
        test8: [{ test8_1: 'TEST8_1' }, { test8_1: 'TEST8_2' }, { test8_1: 'TEST8_3' }]
      }
    ]);
  });
});
