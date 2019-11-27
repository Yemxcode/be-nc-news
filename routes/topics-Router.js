const topicsRouter = require('express').Router();
const {getTopics, postTopic} = require('../controllers/topics');
const {send405Errors} = require('../Errors/index')


topicsRouter.route('/').get(getTopics).post(postTopic).all(send405Errors);



module.exports = topicsRouter;