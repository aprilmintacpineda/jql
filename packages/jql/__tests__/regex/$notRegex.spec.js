/** @format */

const jql = require('../../src/jql');

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

describe('operator $notRegex', () => {
  it('throws error when given wrong value', () => {
    expect(() =>
      jql(
        {
          test1: {
            $notRegex: []
          }
        },
        sampleData
      )
    ).toThrow();

    expect(() =>
      jql(
        {
          test1: {
            $notRegex: 'test'
          }
        },
        sampleData
      )
    ).toThrow();

    expect(() =>
      jql(
        {
          test1: {
            $notRegex: 1
          }
        },
        sampleData
      )
    ).toThrow();

    expect(() =>
      jql(
        {
          test1: {
            $notRegex: ''
          }
        },
        sampleData
      )
    ).toThrow();

    expect(() =>
      jql(
        {
          test1: {
            $notRegex: null
          }
        },
        sampleData
      )
    ).toThrow();

    expect(() =>
      jql(
        {
          test1: {
            $notRegex: undefined
          }
        },
        sampleData
      )
    ).toThrow();
  });

  it('handles multiple layers and arrays', () => {
    const query = {
      test1: {
        $notRegex: /test1$/
      },
      test2: {
        $notRegex: /test2$/
      },
      test3: {
        $notRegex: /test3$/
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $notRegex: /test4$/
            }
          }
        }
      },
      test8: {
        test8_1: {
          $notRegex: /test8_1$/
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
});
