const {changeCommentVote, deleteCommentById, fetchCommentById} = require('../models/comments')




exports.updateCommentVote = (req, res, next) => {
 const {comment_id} = req.params;
 const { inc_votes } = req.body;
 changeCommentVote(inc_votes, comment_id).then(comment => res.status(202).send(comment)).catch(next);
}

exports.removeCommentById = (req, res, next) => {
 const { comment_id } = req.params;
 deleteCommentById(comment_id).then(res.status(204).send()).catch(next);
}


exports.getCommentById = (req, res, next) => {
 const { comment_id } = req.params;
 fetchCommentById(comment_id).then(comment => res.status(200).send(comment)).catch(next)
}