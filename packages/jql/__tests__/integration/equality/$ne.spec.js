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
    test9: 'test',
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
    test10: null,
    test11: null
  }
];

describe('Operator $ne', () => {
  it('throws error when given incorrect input', () => {
    expect(() =>
      jql({
        test1: {
          $ne: ['1']
        }
      }, sampleData)
    ).toThrow(JQLError);

    expect(() =>
      jql({
        test1: {
          $ne: ['']
        }
      }, sampleData)
    ).toThrow(JQLError);

    expect(() =>
      jql({
        test1: {
          $ne: Symbol()
        }
      }, sampleData)
    ).toThrow(JQLError);
  });

  it('works on multiple layers and arrays', () => {
    const query = {
      test1: {
        $ne: 'test1'
      },
      test2: {
        $ne: 'test2'
      },
      test3: {
        $ne: 'test3'
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $ne: 'test4'
            }
          }
        }
      },
      test8: {
        test8_1: {
          $ne: 'test8_2'
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[1]]);
  });

  it('query empty string', () => {
    const query = {
      test1: {
        $ne: 'test11'
      },
      test2: {
        $ne: 'test21'
      },
      test3: {
        $ne: 'test31'
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $ne: 'test41'
            }
          }
        }
      },
      test8: {
        test8_1: {
          $ne: 'test8_11'
        }
      },
      test9: {
        $ne: ''
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[0]]);
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
      test1: {
        $ne: 'test1'
      },
      test2: {
        $ne: 'test2'
      },
      test3: {
        $ne: 'test3'
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $ne: 'test4'
            }
          }
        }
      },
      test8: {
        test8_1: {
          $ne: 'test8_2'
        }
      },
      test10: {
        $ne: undefined
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[1]]);
  });

  it('query a value that does not exist', () => {
    const query = {
      test1: {
        $ne: 'test1'
      },
      test2: {
        $ne: 'test2'
      },
      test3: {
        $ne: 'test3'
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $ne: 'test4'
            }
          }
        }
      },
      test8: {
        test8_1: {
          $ne: 'test8_2'
        }
      },
      test10: {
        $ne: undefined
      },
      does: {
        not: {
          exist: {
            $ne: 'test'
          }
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([]);
  });

  it('query to empty array', () => {
    expect(jql({
      test11: {
        $ne: []
      }
    }, sampleData)).toEqual([sampleData[1]]);

    expect(jql({
      test10: {
        $ne: []
      }
    }, sampleData)).toEqual(sampleData);
  });

  it('deep query to an empty array and when value is different on another row', () => {
    const query = {
      test8: {
        // test8_1 is not an object in row 2
        // but in row 1 there's an entry where test8_1 is an object
        test8_1: {
          test8_1_4: {
            test8_1_4_1: {
              $ne: []
            }
          }
        }
      }
    };

    expect(jql(query, sampleData)).toEqual([sampleData[1]]);
  });
});
