const {changeCommentVote} = require('../models/comments')




exports.updateCommentVote = (req, res, next) => {
 const {comment_id} = req.params;
 const { inc_votes } = req.body;
 changeCommentVote(inc_votes, comment_id).then(comment => res.status(202).send(comment)).catch(next);
}