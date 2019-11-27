
const { fetchUserByUsername, fetchUsers, addUser} = require('../models/users')



exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
  .then( user => res.status(200).send({user}))
  .catch(next);
}

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      res.status(200).send({ users })
    })
    .catch(next);
}

exports.postUser = (req, res, next) => {
  const { username, avatar_url, name} = req.body;
  addUser(username, avatar_url, name)
    .then(user => res.status(200).send({user}))
      .catch(next);

}