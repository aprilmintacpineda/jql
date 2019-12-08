/** @format */

const jql = require('../../../src/jql');
const JQLError = require('../../../src/constructs/JQLError');

const sampleData = [
  {
    notNumber: 'abc',
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
    notNumber: 'abc',
    number1: 100,
    number2: 100,
    number3: {
      number4: {
        number5: {
          number6: 100
        }
      }
    },
    number7: '100',
    number8: [{ number8_1: '100' }, { number8_1: '100' }]
  }
];

describe('Operator $lt', () => {
  it('throws error when given invalid value', () => {
    expect(() =>
      jql(
        {
          number1: {
            $lt: '10'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $lt: Symbol()
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $lt: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $lt: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $lt: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $lt: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $lt: 20
      },
      number2: {
        $lt: 20
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $lt: 20
            }
          }
        }
      },
      number8: {
        number8_1: {
          $lt: 20
        }
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([sampleData[0]]);
  });

  it('handles querying non-numeric fields', () => {
    expect(jql({
      notNumber: {
        $lt: 10
      }
    }, sampleData)).toEqual([]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $lt: 20
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $lt: 20
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
