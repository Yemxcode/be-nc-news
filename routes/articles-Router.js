const articlesRouter = require('express').Router();
const {getArticles, getArticleById, changeArticleById, postCommentById, getCommentsById, removeArticleById, postArticle} = require('../controllers/articles');
const {send405Errors} = require('../Errors/index')



articlesRouter.route('/').get(getArticles).post(postArticle).all(send405Errors);

articlesRouter.route('/:article_id').get(getArticleById).patch(changeArticleById).delete(removeArticleById).all(send405Errors);

articlesRouter.route('/:article_id/comments').post(postCommentById).get(getCommentsById).all(send405Errors);


module.exports = articlesRouter;
