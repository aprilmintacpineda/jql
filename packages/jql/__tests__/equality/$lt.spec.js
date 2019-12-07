const jql = require('../../src/jql');

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
    number8: [
      { number8_1: '10' },
      { number8_1: '10' }
    ]
  },
  {
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
    number8: [
      { number8_1: '100' },
      { number8_1: '100' }
    ]
  }
];

describe('Operator $gt', () => {
  it('throws error when given invalid value', () => {
    expect(() => jql({
      number1: {
        $lt: '10'
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $lt: Symbol()
      }
    }, sampleData)).toThrow();
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
        number8: [
          { number8_1: '10' },
          { number8_1: '10' }
        ]
      }
    ]);
  });

  it('handles undefined and null', () => {
    expect(jql({ number1: undefined }, sampleData)).toEqual([]);
    expect(jql({ number1: null }, sampleData)).toEqual([]);
  });
});
