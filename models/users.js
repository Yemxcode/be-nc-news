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


exports.fetchUsers = () => {
  return knex("users")
    .select("*")
    .then(res => {
      return res;
    });
};

exports.addUser = (username, avatar_url, name) => {
  return knex('users')
    .insert({ username, avatar_url, name})
      .returning("*")
        .then(([user]) => user)
}