const articlesRouter = require('express').Router();
const {getArticles, getArticleById, changeArticleById, postCommentById, getCommentsById} = require('../controllers/articles');
const {send405Errors} = require('../Errors/index')



articlesRouter.route('/').get(getArticles);

articlesRouter.route('/:article_id').get(getArticleById).patch(changeArticleById).all(send405Errors);

articlesRouter.route('/:article_id/comments').post(postCommentById).get(getCommentsById);


module.exports = articlesRouter;
