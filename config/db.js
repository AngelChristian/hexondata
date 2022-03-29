const Pool = require('pg').Pool;
// postgre database connection
module.exports = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: process.env.PASSWORD,
  port: 5432,
});
