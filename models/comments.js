const knex = require('../db/connection');



exports.changeCommentVote = (vote, id) => {
 return knex('comments')
  .where({comment_id : id})
  .increment('votes', vote)
  .returning('*')
  .then(([comment])=> {
   return comment;
  })
}