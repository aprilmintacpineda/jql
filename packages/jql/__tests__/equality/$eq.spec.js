/** @format */

const jql = require('../../src/jql');
const sampleData = require('../sampleData');

// must be in sync with sampleData: { id: 10 }
const expectedResult = [
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    address: {
      street: 'Kattie Turnpike',
      suite: 'Suite 198',
      city: 'Lebsackbury',
      zipcode: '31428-2261',
      geo: {
        lat: -38.2386,
        lng: 57.2232
      }
    },
    phone: '024-648-3804',
    website: 'ambrose.net',
    company: {
      name: 'Hoeger LLC',
      catchPhrase: 'Centralized empowering task-force',
      bs: 'target end-to-end models'
    },
    otherNames: [
      {
        type: 'nickname',
        name: 'Tina'
      },
      {
        type: 'codename',
        name: 'Dub'
      }
    ],
    favoriteColor: ''
  }
];

describe('Operator $eq', () => {
  it('handles implicit $eq', () => {
    const query = {
      email: 'Rey.Padberg@karina.biz'
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('handles explicit $eq', () => {
    const query = {
      email: {
        $eq: 'Rey.Padberg@karina.biz'
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('throw error when value is invalid', () => {
    expect(() => jql({
      email: ['']
    }, sampleData)).toThrow();

    expect(() => jql({
      email: {
        $eq: ['']
      }
    }, sampleData)).toThrow();

    expect(() => jql({
      email: Symbol()
    }, sampleData)).toThrow();
  });

  it('handles array values', () => {
    const query = {
      otherNames: {
        name: 'Tina'
      }
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('handles not existing fields in query', () => {
    let query = {
      notExisting: 'value'
    };

    let actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([]);

    query = {
      notExisting: {
        notExsting: 'value'
      }
    };

    actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([]);
  });

  it('handles eq in subquery', () => {
    // implicit
    let query = {
      $or: [
        {
          email: 'Rey.Padberg@karina.biz'
        }
      ]
    };

    let actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);

    // explicit
    query = {
      email: {
        $or: [{ $eq: 'Rey.Padberg@karina.biz' }]
      }
    };

    actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('handles equality with empty string', () => {
    const query = {
      favoriteColor: ''
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('handles equality with null', () => {
    const query = {
      otherNames: null
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
      {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        address: {
          street: 'Rex Trail',
          suite: 'Suite 280',
          city: 'Howemouth',
          zipcode: '58804-1099',
          geo: {
            lat: 24.8918,
            lng: 21.8984
          }
        },
        phone: '210.067.6132',
        website: 'elvis.io',
        company: {
          name: 'Johns Group',
          catchPhrase: 'Configurable multimedia task-force',
          bs: 'generate enterprise e-tailers'
        },
        otherNames: null
      }
    ]);
  });

  it('handles equality with undefined', () => {
    const query = {
      otherNames: undefined
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        address: {
          street: 'Ellsworth Summit',
          suite: 'Suite 729',
          city: 'Aliyaview',
          zipcode: '45169',
          geo: {
            lat: -14.399,
            lng: -120.7677
          }
        },
        phone: '586.493.6943 x140',
        website: 'jacynthe.com',
        company: {
          name: 'Abernathy Group',
          catchPhrase: 'Implemented secondary concept',
          bs: 'e-enable extensible e-tailers'
        }
      },
      {
        id: 9,
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        address: {
          street: 'Dayna Park',
          suite: 'Suite 449',
          city: 'Bartholomebury',
          zipcode: '76495-3109',
          geo: {
            lat: 24.6463,
            lng: -168.8889
          }
        },
        phone: '(775)976-6794 x41206',
        website: 'conrad.com',
        company: {
          name: 'Yost and Sons',
          catchPhrase: 'Switchable contextually-based project',
          bs: 'aggregate real-time technologies'
        }
      }
    ]);
  });

  it('handles equality to empty array', () => {
    const query = {
      otherNames: []
    };

    const actualValue = jql(query, sampleData);

    expect(actualValue).toEqual([
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        address: {
          street: 'Norberto Crossing',
          suite: 'Apt. 950',
          city: 'South Christy',
          zipcode: '23505-1337',
          geo: {
            lat: -71.4197,
            lng: 71.7478
          }
        },
        phone: '1-477-935-8478 x6430',
        website: 'ola.org',
        company: {
          name: 'Considine-Lockman',
          catchPhrase: 'Synchronised bottom-line interface',
          bs: 'e-enable innovative applications'
        },
        otherNames: []
      }
    ]);
  });

  it('handles equality on multiple fields', () => {
    const query = {
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton'
    };

    const actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);
  });

  it('handles equality on multiple layer and multiple fields', () => {
    let query = {
      name: 'Clementina DuBuque',
      $or: [
        { username: 'Moriah.Stanton' }
      ],
      email: {
        $or: [
          { $eq: 'Rey.Padberg@karina.biz' }
        ]
      },
      address: {
        city: 'Lebsackbury',
        zipcode: '31428-2261',
        geo: {
          lat: -38.2386,
          lng: 57.2232
        }
      },
      phone: '024-648-3804',
      website: 'ambrose.net',
      company: {
        name: 'Hoeger LLC',
        catchPhrase: 'Centralized empowering task-force',
        bs: 'target end-to-end models'
      },
      otherNames: {
        type: 'nickname',
        name: 'Tina'
      }
    };

    let actualResult = jql(query, sampleData);
    expect(actualResult).toEqual(expectedResult);

    // with undefined
    query = {
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      address: {
        street: 'Ellsworth Summit',
        suite: 'Suite 729',
        city: 'Aliyaview',
        zipcode: '45169',
        geo: {
          lat: -14.399,
          lng: -120.7677
        }
      },
      phone: '586.493.6943 x140',
      website: 'jacynthe.com',
      company: {
        name: 'Abernathy Group',
        catchPhrase: 'Implemented secondary concept',
        bs: 'e-enable extensible e-tailers'
      },
      otherNames: undefined
    };

    actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        address: {
          street: 'Ellsworth Summit',
          suite: 'Suite 729',
          city: 'Aliyaview',
          zipcode: '45169',
          geo: {
            lat: -14.399,
            lng: -120.7677
          }
        },
        phone: '586.493.6943 x140',
        website: 'jacynthe.com',
        company: {
          name: 'Abernathy Group',
          catchPhrase: 'Implemented secondary concept',
          bs: 'e-enable extensible e-tailers'
        }
      }
    ]);

    // with empty array
    query = {
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      address: {
        street: 'Norberto Crossing',
        suite: 'Apt. 950',
        city: 'South Christy',
        zipcode: '23505-1337',
        geo: {
          lat: -71.4197,
          lng: 71.7478
        }
      },
      phone: '1-477-935-8478 x6430',
      website: 'ola.org',
      company: {
        name: 'Considine-Lockman',
        catchPhrase: 'Synchronised bottom-line interface',
        bs: 'e-enable innovative applications'
      },
      otherNames: []
    };

    actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        address: {
          street: 'Norberto Crossing',
          suite: 'Apt. 950',
          city: 'South Christy',
          zipcode: '23505-1337',
          geo: {
            lat: -71.4197,
            lng: 71.7478
          }
        },
        phone: '1-477-935-8478 x6430',
        website: 'ola.org',
        company: {
          name: 'Considine-Lockman',
          catchPhrase: 'Synchronised bottom-line interface',
          bs: 'e-enable innovative applications'
        },
        otherNames: []
      }
    ]);

    // with null
    query = {
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      address: {
        street: 'Rex Trail',
        suite: 'Suite 280',
        city: 'Howemouth',
        zipcode: '58804-1099',
        geo: {
          lat: 24.8918,
          lng: 21.8984
        }
      },
      phone: '210.067.6132',
      website: 'elvis.io',
      company: {
        name: 'Johns Group',
        catchPhrase: 'Configurable multimedia task-force',
        bs: 'generate enterprise e-tailers'
      },
      otherNames: null
    };

    actualResult = jql(query, sampleData);
    expect(actualResult).toEqual([
      {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        address: {
          street: 'Rex Trail',
          suite: 'Suite 280',
          city: 'Howemouth',
          zipcode: '58804-1099',
          geo: {
            lat: 24.8918,
            lng: 21.8984
          }
        },
        phone: '210.067.6132',
        website: 'elvis.io',
        company: {
          name: 'Johns Group',
          catchPhrase: 'Configurable multimedia task-force',
          bs: 'generate enterprise e-tailers'
        },
        otherNames: null
      }
    ]);
  });
});
