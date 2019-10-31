const topicsRouter = require('express').Router();
const {getTopics} = require('../controllers/topics');
const {send405Errors} = require('../Errors/index')


topicsRouter.route('/').get(getTopics).all(send405Errors);



module.exports = topicsRouter;