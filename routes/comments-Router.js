const commentsRouter = require('express').Router();
const { updateCommentVote, removeCommentById, getCommentById } = require('../controllers/comments');
const {send405Errors} = require('../Errors/index')





commentsRouter.route('/:comment_id').patch(updateCommentVote).delete(removeCommentById).all(send405Errors);





module.exports = commentsRouter;