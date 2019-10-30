const commentsRouter = require('express').Router();
const { updateCommentVote, removeCommentById, getCommentById } = require('../controllers/comments')





commentsRouter.route('/:comment_id').patch(updateCommentVote).delete(removeCommentById).get(getCommentById);





module.exports = commentsRouter;