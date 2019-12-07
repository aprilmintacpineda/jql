/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/helpers/JQLError');

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

describe('operator $regex', () => {
  it('throws error when given wrong value', () => {
    expect(() =>
      jql(
        {
          test1: {
            $regex: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $regex: 'test'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $regex: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $regex: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $regex: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          test1: {
            $regex: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple layers and arrays', () => {
    const query = {
      test1: {
        $regex: /test1$/
      },
      test2: {
        $regex: /test2$/
      },
      test3: {
        $regex: /test3$/
      },
      test4: {
        test5: {
          test6: {
            test7: {
              $regex: /test4$/
            }
          }
        }
      },
      test8: {
        test8_1: {
          $regex: /test8_1$/
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
});
