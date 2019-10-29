const {fetchArticleById, updateArticleById} = require('../models/articles');




exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then(article => {
    res.status(200).send(article);
  }).catch(next);
}

exports.changeArticleById = (req, res, next) => {
  const {body : {vote}} = req
  const { article_id } = req.params;
  updateArticleById(vote, article_id).then(article => {
    res.status(200).send(article);
  }).catch(next);
}