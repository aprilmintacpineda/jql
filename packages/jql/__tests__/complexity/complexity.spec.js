const jql = require('../../src/jql');
const sampleData = require('./database.json');

// some queries give the same result even though
// the approach may be different
// the goal here is to test the flexibility of jql-query

describe('Complexity test', () => {
  it('Good queries', () => {
    // select * from list where address.geo.lat = "29.4572"
    expect(jql({
      address: {
        geo: {
          lat: '29.4572'
        }
      }
    }, sampleData)).toEqual([sampleData[0]]);

    // select * from list
    // where
    //    address.geo.lat = "29.4572" and
    //     address.geo.lng <> "-164.2990"
    expect(jql({
      address: {
        geo: {
          lat: '29.4572',
          lng: {
            $ne: '-164.2990'
          }
        }
      }
    }, sampleData)).toEqual([]);

    // select * from list where posts.comments has id = 151
    expect(jql({
      posts: {
        comments: {
          id: 151
        }
      }
    }, sampleData)).toEqual([sampleData[0]]);

    // select * from list
    // where post.comments has
    //    postId = 31 and
    //    id = 151
    //    email = "Cary@taurean.biz"
    expect(jql({
      posts: {
        comments: {
          postId: 31,
          id: 151,
          email: 'Cary@taurean.biz'
        }
      }
    }, sampleData)).toEqual([sampleData[0]]);

    // select * from list
    // where
    //    posts.comments has email = "Cary@taurean.biz" or
    //    posts.comments has email = "Eliseo@gardner.biz" or
    //    posts.comments has email = "Lura@rod.tv"
    expect(jql({
      posts: {
        comments: {
          email: {
            $in: ['Cary@taurean.biz', 'Eliseo@gardner.biz', 'Lura@rod.tv']
          }
        }
      }
    }, sampleData)).toEqual([
      sampleData[0],
      sampleData[1],
      sampleData[2]
    ]);
  });

  // they are bad because they are unnecessarily long
  // and the operators were misused.
  it('Bad queries', () => {
    // select * from list
    // where post.comments has
    //    postId = 31 and
    //    id = 151
    //    email = "Cary@taurean.biz"
    expect(jql({
      posts: {
        comments: {
          $and: [
            { postId: 31 },
            { id: 151 },
            { email: 'Cary@taurean.biz' }
          ]
        }
      }
    }, sampleData)).toEqual([sampleData[0]]);

    // select * from list
    // where
    //    posts.comments has email = "Cary@taurean.biz" or
    //    posts.comments has email = "Eliseo@gardner.biz" or
    //    posts.comments has email = "Lura@rod.tv"
    expect(jql({
      $and: [
        {
          $or: [
            {
              posts: {
                comments: {
                  email: 'Cary@taurean.biz'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Eliseo@gardner.biz'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Lura@rod.tv'
                }
              }
            }
          ]
        }
      ]
    }, sampleData)).toEqual([
      sampleData[0],
      sampleData[1],
      sampleData[2]
    ]);

    // select * from list
    // where
    //    posts.comments has email = "Cary@taurean.biz" or
    //    posts.comments has email = "Eliseo@gardner.biz" or
    //    posts.comments has email = "Lura@rod.tv"
    expect(jql({
      $or: [
        {
          posts: {
            comments: {
              email: 'Cary@taurean.biz'
            }
          }
        },
        {
          posts: {
            comments: {
              email: 'Eliseo@gardner.biz'
            }
          }
        },
        {
          posts: {
            comments: {
              email: 'Lura@rod.tv'
            }
          }
        }
      ]
    }, sampleData)).toEqual([
      sampleData[0],
      sampleData[1],
      sampleData[2]
    ]);

    // select * from list
    // where
    //    posts.comments has email = "Cary@taurean.biz" or
    //    posts.comments has email = "Eliseo@gardner.biz" or
    //    posts.comments has email = "Lura@rod.tv"
    expect(jql({
      posts: {
        $or: [
          {
            comments: {
              email: 'Cary@taurean.biz'
            }
          },
          {
            comments: {
              email: 'Eliseo@gardner.biz'
            }
          },
          {
            comments: {
              email: 'Lura@rod.tv'
            }
          }
        ]
      }
    }, sampleData)).toEqual([
      sampleData[0],
      sampleData[1],
      sampleData[2]
    ]);

    // select * from list
    // where
    //    (
    //      posts.comments has email = "Cary@taurean.biz" or
    //      posts.comments has email = "Eliseo@gardner.biz" or
    //      posts.comments has email = "Lura@rod.tv" or
    //    ) and (
    //      posts.comments has email = "Laurie@lincoln.us" or
    //      posts.comments has email = "Abigail.OConnell@june.org" or
    //      posts.comments has email = "Laverne_Price@scotty.info"
    //    )
    expect(jql({
      $and: [
        {
          $or: [
            {
              posts: {
                comments: {
                  email: 'Cary@taurean.biz'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Eliseo@gardner.biz'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Lura@rod.tv'
                }
              }
            }
          ]
        },
        {
          $or: [
            {
              posts: {
                comments: {
                  email: 'Laurie@lincoln.us'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Abigail.OConnell@june.org'
                }
              }
            },
            {
              posts: {
                comments: {
                  email: 'Laverne_Price@scotty.info'
                }
              }
            }
          ]
        }
      ]
    }, sampleData)).toEqual([]);

    expect(jql({
      $and: [
        {
          $or: [
            {
              posts: {
                comments: {
                  id: 151
                }
              }
            },
            {
              posts: {
                comments: {
                  id: 1
                }
              }
            },
            {
              posts: {
                comments: {
                  id: 101
                }
              }
            }
          ]
        }
      ],
      $or: [
        {
          posts: {
            comments: {
              id: 51
            }
          }
        },
        {
          posts: {
            comments: {
              id: 201
            }
          }
        },
        {
          posts: {
            comments: {
              id: 205
            }
          }
        }
      ]
    }, sampleData)).toEqual([
      sampleData[0],
      sampleData[1],
      sampleData[2]
    ]);
  });
});
