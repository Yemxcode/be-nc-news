const knex = require('../db/connection');


exports.fetchUserByUsername = (username) => {
  return knex.first('*').from('users').where('username', username)
  .then(user => {
    if (!user) {
      return Promise.reject({
      status: 404,
      msg: `No user found for username: ${username}`
    });
   }
   return user
  });
};