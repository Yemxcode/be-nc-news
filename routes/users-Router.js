const usersRouter = require('express').Router();
const {getUserByUsername, getUsers} = require('../controllers/users');
const {send405Errors} = require('../Errors/index')



usersRouter.route('/').get(getUsers).all(send405Errors);


usersRouter.route('/:username').get(getUserByUsername).all(send405Errors);


module.exports = usersRouter;