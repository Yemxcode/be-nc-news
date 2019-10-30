const {fetchArticleById, updateArticleById, insertCommentById, fetchCommentsById} = require('../models/articles');




exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id).then(article => {
    res.status(200).send(article);
  }).catch(next);
}

exports.changeArticleById = (req, res, next) => {
  const {body : {inc_votes}} = req
  const { article_id } = req.params;
  updateArticleById(inc_votes, article_id).then(article => {
    res.status(200).send(article);
  }).catch(next);
}


exports.postCommentById = (req, res, next) => {
  const {article_id} = req.params
  const {username, body} = req.body;
  insertCommentById(article_id, username, body).then(comment => {
    res.status(201).send(comment);
  }).catch(next);
}

exports.getCommentsById = (req, res, next) => {
  const {article_id} = req.params;
  fetchCommentsById(article_id).then(comments => {
    res.status(200).send(comments);
  })
}