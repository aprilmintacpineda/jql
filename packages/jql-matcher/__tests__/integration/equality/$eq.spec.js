const jql = require('../../../src');
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
    test8: [
      { test8_1: 'test8_1' },
      { test8_1: 'test8_2' },
      { test8_1: 'test8_3' },
      {
        test8_1: [
          {
            test8_1_1: 'test8_1_1',
            test8_1_2: 'test8_1_2',
            test8_1_3: 'test8_1_3',
            test8_1_4: [
              { test8_1_4_1: 'test8_1_4_1' },
              { test8_1_4_1: [] }
            ]
          }
        ]
      }
    ],
    test10: undefined,
    test11: []
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
    test8: [{ test8_1: 'test8_11' }, { test8_1: 'test8_21' }, { test8_1: 'test8_31' }],
    test9: '',
    test10: null
  }
];

describe('Operator $eq', () => {
  it('throws error when given incorrect input', () => {
    expect(() =>
      jql({
        test1: ['1']
      }, sampleData)
    ).toThrow(JQLError);

    expect(() =>
      jql({
        test1: ['']
      }, sampleData)
    ).toThrow(JQLError);

    expect(() =>
      jql({
        test1: Symbol()
      }, sampleData)
    ).toThrow(JQLError);
  });

  it('works on multiple layers and arrays', () => {
    const query = {
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
      test8: {
        test8_1: 'test8_2'
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
  });

  it('query empty string', () => {
    const query = {
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
      test8: {
        test8_1: 'test8_11'
      },
      test9: ''
    };

    expect(jql(query, sampleData)).toEqual([sampleData[1]]);
  });

  it('query null', () => {
    const query = {
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
      test8: {
        test8_1: 'test8_11'
      },
      test9: '',
      test10: null
    };

    expect(jql(query, sampleData)).toEqual([sampleData[1]]);
  });

  it('query undefined', () => {
    const query = {
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
      test8: {
        test8_1: 'test8_2'
      },
      test10: undefined
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
  });

  it('query a value that does not exist', () => {
    const query = {
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
      test8: {
        test8_1: 'test8_2'
      },
      test10: undefined,
      does: {
        not: {
          exist: 'test'
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([]);
  });

  it('query undefined to a value that does not exist', () => {
    let query = {
      does: {
        not: {
          exist: undefined
        }
      }
    };

    expect(jql(query, sampleData)).toEqual(sampleData);

    query = {
      test1: 'test1',
      does: {
        not: {
          exist: undefined
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
  });

  it('query to empty array', () => {
    const query = {
      test11: []
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
  });

  it('deep query to an empty array and when value is different on another row', () => {
    const query = {
      test8: {
        // test8_1 is not an object in row 2
        // but in row 1 there's an entry where test8_1 is an object
        test8_1: {
          test8_1_4: {
            test8_1_4_1: []
          }
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
  });
});
