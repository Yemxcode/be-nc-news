const {changeCommentVote, deleteCommentById} = require('../models/comments')




exports.updateCommentVote = (req, res, next) => {
 const {comment_id} = req.params;
 const { inc_votes } = req.body;
 if(Object.keys(req.body).length > 1){
  res.status(422).send({ msg: 'Please provide a single object body following the format: { inc_votes: 2}, if multiple are provided in one body the last will be processed'})
 }
 changeCommentVote(inc_votes, comment_id)
 .then(comment => res.status(200).send({comment}))
 .catch(next);
}

exports.removeCommentById = (req, res, next) => {
 const { comment_id } = req.params;
 deleteCommentById(comment_id)
 .then(() => res.sendStatus(204))
 .catch(next);
}

