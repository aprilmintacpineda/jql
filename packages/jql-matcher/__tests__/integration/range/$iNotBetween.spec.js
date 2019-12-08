/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/constructs/JQLError');

const sampleData = [
  {
    number1: 5,
    number2: 5,
    number3: {
      number4: {
        number5: {
          number6: 5
        }
      }
    },
    number7: '5',
    number8: [{ number8_1: '5' }, { number8_1: '5' }]
  },
  {
    number1: 3,
    number2: 3,
    number3: {
      number4: {
        number5: {
          number6: 3
        }
      }
    },
    number7: '3',
    number8: [{ number8_1: '3' }, { number8_1: '3' }]
  }
];

describe('operator $iNotBetween', () => {
  test('throws error when given wrong values', () => {
    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: [1, 2, 3]
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: ['1', '2']
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: '1'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: Symbol()
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $iNotBetween: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $iNotBetween: [1, 5]
      },
      number2: {
        $iNotBetween: [1, 5]
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $iNotBetween: [1, 5]
            }
          }
        }
      },
      number8: {
        number8_1: {
          $iNotBetween: [1, 5]
        }
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([sampleData[0]]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $iNotBetween: [1, 5]
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $iNotBetween: [1, 5]
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
