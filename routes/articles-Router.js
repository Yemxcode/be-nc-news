const articlesRouter = require('express').Router();
const {getArticles, getArticleById, changeArticleById, postCommentById, getCommentsById} = require('../controllers/articles');



articlesRouter.route('/').get(getArticles);

articlesRouter.route('/:article_id').get(getArticleById).patch(changeArticleById);

articlesRouter.route('/:article_id/comments').post(postCommentById).get(getCommentsById);


module.exports = articlesRouter;
