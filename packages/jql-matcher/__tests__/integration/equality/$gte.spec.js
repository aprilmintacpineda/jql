/** @format */

const jql = require('../../../src');
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

describe('Operator $gte', () => {
  it('throws error when given invalid value', () => {
    expect(() =>
      jql(
        {
          number1: {
            $gte: '10'
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gte: Symbol()
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gte: []
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gte: ''
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gte: undefined
          }
        },
        sampleData
      )
    ).toThrow(JQLError);

    expect(() =>
      jql(
        {
          number1: {
            $gte: null
          }
        },
        sampleData
      )
    ).toThrow(JQLError);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $gte: 10
      },
      number2: {
        $gte: 10
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $gte: 10
            }
          }
        }
      },
      number8: {
        number8_1: {
          $gte: 10
        }
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([sampleData[0]]);
  });

  it('handles querying non-numeric values', () => {
    expect(jql({
      notNumber: {
        $gte: 6
      }
    }, sampleData)).toEqual([]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $gte: 10
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $gte: 10
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
