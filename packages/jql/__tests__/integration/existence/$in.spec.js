/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/constructs/JQLError');

const sampleData = [
  {
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
    test4: {
      test5: {
        test6: {
          test7: 'test4'
        }
      }
    },
    test8: [{ test8_1: 'test8_1' }, { test8_1: 'test8_2' }, { test8_1: 'test8_3' }]
  },
  {
    test1: 'test11',
    test2: 'test21',
    test3: 'test31',
    test4: {
      test5: {
        test6: {
          test7: 'test41'
        }
      }
    },
    test8: [{ test8_1: 'test8_11' }, { test8_1: 'test8_21' }, { test8_1: 'test8_31' }]
  }
];

describe('Operator $in', () => {
  test('throws error when given wrong value', () => {
    expect(() =>
      jql(
        {
          test1: {
            $in: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $in: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $in: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $in: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $in: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  test('handles deep nesting and arrays', () => {
    const query = {
      test1: {
        $in: ['test11', 'test12', 'test13']
      },
      test2: {
        $in: ['test11', 'test21', 'test13']
      },
      test3: {
        $in: ['test11', 'test21', 'test31']
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $in: ['test11', 'test21', 'test13', 'test41']
            }
          }
        }
      },
      test8: {
        test8_1: {
          $in: ['test8_11', 'test8_12', 'test8_13']
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([
      {
        test1: 'test11',
        test2: 'test21',
        test3: 'test31',
        test4: {
          test5: {
            test6: {
              test7: 'test41'
            }
          }
        },
        test8: [{ test8_1: 'test8_11' }, { test8_1: 'test8_21' }, { test8_1: 'test8_31' }]
      }
    ]);
  });

  test('is case sensitive', () => {
    const query = {
      test1: {
        $in: ['TeST11', 'TeST12', 'TeST13']
      },
      test2: {
        $in: ['TeST11', 'TeST21', 'TeST13']
      },
      test3: {
        $in: ['TeST11', 'TeST21', 'TeST31']
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $in: ['TeST11', 'TeST21', 'TeST13', 'TeST41']
            }
          }
        }
      },
      test8: {
        test8_1: {
          $in: ['TeST8_11', 'TeST8_12', 'TeST8_13']
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $in: ['TeST11', 'TeST12', 'TeST13']
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $in: ['TeST11', 'TeST12', 'TeST13']
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
