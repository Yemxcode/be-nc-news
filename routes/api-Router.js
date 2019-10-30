const apiRouter = require('express').Router();
const topicsRouter = require('./topics-Router');
const usersRouter = require('./users-Router');
const articlesRouter = require('./articles-Router');
const commentsRouter = require('./comments-Router');



apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/articles', articlesRouter );

module.exports = apiRouter;