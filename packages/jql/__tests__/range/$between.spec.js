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
    number8: [
      { number8_1: '0' },
      { number8_1: '0' }
    ]
  }
];

describe('operator $between', () => {
  test('throws error when given wrong values', () => {
    expect(() => jql({
      number1: {
        $between: [1,2,3]
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $between: []
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $between: ['1', '2']
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $between: 1
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $between: '1'
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      number1: {
        $between: Symbol()
      }
    }, sampleData)).toThrow();
  });

  it('handles undefined and null', () => {
    expect(jql({ number1: { $between: undefined } }, sampleData)).toEqual([]);
    expect(jql({ number1: { $between: null } }, sampleData)).toEqual([]);
  });

  it('handles multiple query and layers', () => {
    const query = {
      number1: {
        $between: [1, 20]
      },
      number2: {
        $between: [1, 20]
      },
      number3: {
        number4: {
          number5: {
            number6: {
              $between: [1, 20]
            }
          }
        }
      },
      number8: {
        number8_1: {
          $between: [1, 20]
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
});
