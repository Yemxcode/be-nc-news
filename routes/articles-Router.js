const articlesRouter = require('express').Router();
const {getArticleById, changeArticleById} = require('../controllers/articles');



articlesRouter.route('/:article_id').get(getArticleById).patch(changeArticleById);




module.exports = articlesRouter;
