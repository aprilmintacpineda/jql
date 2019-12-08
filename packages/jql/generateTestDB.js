const fetch = require('node-fetch');
const chalk = require('chalk');
const userList = [];

function log (...args) {
  console.log(chalk.green('INFO'), ':', ...args); // eslint-disable-line
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => Promise.all(
    users.map(user => {
      log('Fetching posts for user', chalk.yellow(user.id), chalk.yellow(user.email));

      return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then(response => response.json())
        .then(posts => Promise.all(
          posts.map(post => {
            log('Fetching comments for post', chalk.yellow(post.id), 'for user', chalk.yellow(user.id), chalk.yellow(user.email));

            return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
              .then(response => response.json())
              .then(comments => ({ ...post, comments }));
          })
        ))
        .then(posts => {
          log('User data composition done for user', chalk.yellow(user.email));

          userList.push({
            ...user,
            posts
          });
        });
    })
  ))
  .then(() => {
    const dbPath = require('path').join(__dirname, '__tests__/moreComplexTests/database.json');
    log('Saving file to', chalk.yellow(dbPath));

    return require('fs').promises.writeFile(
      dbPath,
      JSON.stringify(userList),
      { flag: 'w' }
    );
  })
  .then(() => log('done'));
