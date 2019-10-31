const usersRouter = require('express').Router();
const {getUserByUsername} = require('../controllers/users');
const {send405Errors} = require('../Errors/index')



usersRouter.route('/:username').get(getUserByUsername).all(send405Errors);


module.exports = usersRouter;