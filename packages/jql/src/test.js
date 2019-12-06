/** @format */

const jql = require('./jql');
const data = [
  {
    status: 'incomplete',
    id: '5de8778a06f55f018bd6bdb7',
    type: 'email',
    subject: 'pppppppppppqwqwqw',
    assignee: 'a451b99d-c89d-40ba-9967-b655cd9ceee7',
    contactId: '5d9c12888a04c63a8a493e79',
    grade: 10,
    contact: {
      id: '5d9c12888a04c63a8a493e92',
      firstName: 'Bartholome',
      lastName: 'Johnston',
      title: 'mrs',
      status: 'completed',
      location: {
        city: 'Caloocan',
        house: {
          number: 1
        }
      }
    },
    tags: [
      {
        id: 1,
        name: 'test1',
        description: 'test tag 1',
        tags: [
          {
            id: 1,
            title: 'test1'
          }
        ]
      },
      {
        id: 2,
        name: 'test2',
        description: 'test tag 2'
      },
      {
        id: 3,
        name: 'test3',
        description: 'test tag 3'
      }
    ]
  },
  {
    status: 'incomplete',
    id: '5de8766cdc1175d46ed1665c',
    type: 'post',
    subject: '111111111111111',
    assignee: 'a451b99d-c89d-40ba-9967-b655cd9ceee7',
    contactId: '5d9c12888a04c63a8a493e96',
    grade: 12,
    contact: {
      id: '5d9c12888a04c63a8a493e49',
      firstName: 'Enola',
      lastName: 'Koepp',
      title: 'mr',
      status: 'completed',
      location: {
        city: 'Quezon',
        house: {
          number: 1
        }
      }
    },
    tags: [
      {
        id: 1,
        name: 'test1',
        description: 'test tag 1'
      }
    ]
  },
  {
    status: 'incomplete',
    id: '5de874b8dc1175d46ed1665b',
    type: 'call',
    subject: 'qwetewr',
    assignee: 'a451b99d-c89d-40ba-9967-b655cd9ceee7',
    contactId: '5d9c12888a04c63a8a493e80',
    grade: 16,
    contact: {
      id: '5de843890485f7fc28867c4d',
      firstName: 'qweqrw',
      lastName: 'qwrqer',
      title: 'mr',
      status: 'incomplete',
      location: {
        city: 'Pasay',
        house: {
          number: 1
        }
      }
    },
    tags: [
      {
        id: 2,
        name: 'test2',
        description: 'test tag 2'
      },
      {
        id: 3,
        name: 'test3',
        description: 'test tag 3'
      }
    ]
  }
];

/**
 * where
 *    status = "incomplete" and
 *    contact.lastName = "qwrqer" and
 *    contact.location.city = "Pasay" and
 *    contact.location.house.number = 1
 */

const query = {
  tags: {
    name: 'test2'
  }
};
const start = Date.now();
const result = jql(query, data);
const end = Date.now() - start;

console.log(`Query took ${end}ms`);
console.log(result);
