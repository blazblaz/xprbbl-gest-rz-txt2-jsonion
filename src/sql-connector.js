import { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } from '../local/mysql'

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : MYSQL_HOST,
    user : MYSQL_USER,
    password : MYSQL_PWD,
    database : MYSQL_DB
  }
});

export default knex;
