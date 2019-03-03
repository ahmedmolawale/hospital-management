const fs = require('fs');
// require('dotenv/config');

module.exports = {
  development: {
    username: 'bb0f4e2d71c8aa',
    password: 'f0ecdbc1',
    database: 'heroku_4976050155a9d46',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    dialect: 'mysql'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'bb0f4e2d71c8aa',
    password: 'f0ecdbc1',
    database: 'heroku_4976050155a9d46',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    dialect: 'mysql'
  }
};