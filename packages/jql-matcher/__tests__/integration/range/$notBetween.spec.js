/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/constructs/JQLError');

const sampleData = [
  {
    number1: 10,
    number2: 10,
    number3: {
      number4: {
        number5: {
          number6: 10
        }
      }
    },
    number7: '10',
    number8: [{ number8_1: '10' }, { number8_1: '10' }]
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

describe('operator $notBetween', () => {
  test('throws error when given wrong values', () => {
    expect(() =>
      jql(
        {
          number1: {
            $notBetween: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: [1, 2, 3]
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: ['1', '2']
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: 1
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: '1'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: Symbol()
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $notBetween: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $notBetween: [1, 5]
      },
      number2: {
        $notBetween: [1, 5]
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $notBetween: [1, 5]
            }
          }
        }
      },
      number8: {
        number8_1: {
          $notBetween: [1, 5]
        }
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([sampleData[0]]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $notBetween: [1, 5]
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $notBetween: [1, 5]
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
