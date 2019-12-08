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
    expect(actualResult).toEqual([sampleData[0]]);
  });

  it('handles querying a field that is not numeric', () => {
    const query = {
      notNumber: {
        $gt: 0
      }
    };

    expect(jql(query, sampleData)).toEqual([]);
  });

  it('handles querying a field that does not exist', () => {
    expect(jql({
      doesNotExist: {
        $gt: 0
      }
    }, sampleData)).toEqual([]);

    expect(jql({
      does: {
        not: {
          exist: {
            $gt: 0
          }
        }
      }
    }, sampleData)).toEqual([]);
  });
});
