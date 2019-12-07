/** @format */

const jql = require('../../src/jql');
const JQLError = require('../../src/helpers/JQLError');

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
    number1: 0,
    number2: 0,
    number3: {
      number4: {
        number5: {
          number6: 0
        }
      }
    },
    number7: '0',
    number8: [{ number8_1: '0' }, { number8_1: '0' }]
  }
];

describe('Operator $gt', () => {
  it('throws error when given invalid value', () => {
    expect(() =>
      jql(
        {
          number1: {
            $gt: '10'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gt: Symbol()
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gt: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gt: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gt: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gt: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $gt: 5
      },
      number2: {
        $gt: 5
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $gt: 5
            }
          }
        }
      },
      number8: {
        number8_1: {
          $gt: 5
        }
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
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
      }
    ]);
  });
});
