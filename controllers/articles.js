const {fetchArticles, fetchArticleById, updateArticleById, insertCommentById, fetchCommentsById, deleteArticleById, insertArticle, totalArticleCount} = require('../models/articles');




exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
  .then(article => res.status(200).send({article}))
  .catch(next);
}

exports.changeArticleById = (req, res, next) => {
  const {body : {inc_votes}} = req
  if(Object.keys(req.body).length > 1)
    return res.status(422).send('Please provide a single object body following the format: { inc_votes: 2}');
  const { article_id } = req.params;
  updateArticleById(inc_votes, article_id)
  .then(article => res.status(200).send({article}))
  .catch(next);
}


exports.postCommentById = (req, res, next) => {
  const {article_id} = req.params
  const {username, body} = req.body;
  insertCommentById(article_id, username, body)
  .then(comment => res.status(201).send({comment}))
  .catch(next);
}

exports.getCommentsById = (req, res, next) => {
  const {article_id} = req.params;
  const {sort_by, order} = req.query;
  fetchCommentsById(article_id, sort_by, order)
  .then(([comments]) => res.status(200).send({comments}))
  .catch(next);
}


exports.getArticles = (req, res, next) => {
  const {sort_by, order, author, topic, page} = req.query;
  Promise.all([fetchArticles(sort_by, order, author, topic, page), totalArticleCount(author, topic)])
    .then(([articles, totalCount]) => {
      res.status(200).send({articles, totalCount})})
    .catch(next);
}

exports.removeArticleById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticleById(article_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}


exports.postArticle = (req, res, next) => {
  const {author, topic, title, body } = req.body;
  insertArticle(author, topic, title, body)
    .then(article => res.status(200).send({article}))
      .catch(next);
}