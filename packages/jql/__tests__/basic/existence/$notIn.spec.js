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

describe('Operator $notIn', () => {
  test('throws error when given wrong value', () => {
    expect(() =>
      jql(
        {
          test1: {
            $notIn: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $notIn: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $notIn: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $notIn: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $notIn: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  test('handles deep nesting and arrays', () => {
    const query = {
      test1: {
        $notIn: ['test11', 'test12', 'test13']
      },
      test2: {
        $notIn: ['test11', 'test21', 'test13']
      },
      test3: {
        $notIn: ['test11', 'test21', 'test31']
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $notIn: ['test11', 'test21', 'test13', 'test41']
            }
          }
        }
      },
      test8: {
        test8_1: {
          $notIn: ['test8_11', 'test8_12', 'test8_13']
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([
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
      }
    ]);
  });

  test('is case senstive', () => {
    const query = {
      test1: {
        $notIn: ['tEsT11', 'tEsT12', 'tEsT13']
      },
      test2: {
        $notIn: ['tEsT11', 'tEsT21', 'tEsT13']
      },
      test3: {
        $notIn: ['tEsT11', 'tEsT21', 'tEsT31']
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $notIn: ['tEsT11', 'tEsT21', 'tEsT13', 'tEsT41']
            }
          }
        }
      },
      test8: {
        test8_1: {
          $notIn: ['tEsT8_11', 'tEsT8_12', 'tEsT8_13']
        }
      }
    };

    expect(jql(query, sampleData)).toEqual(sampleData);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $notIn: ['tEsT11', 'tEsT12', 'tEsT13']
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $notIn: ['tEsT11', 'tEsT12', 'tEsT13']
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
