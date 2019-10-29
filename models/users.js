const knex = require('../db/connection');


exports.fetchUserByUsername = (username) => {
  return knex.first('*').from('users').where('username', username);
}