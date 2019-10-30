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


exports.deleteCommentById = (id) => {
 return knex('comments')
  .where('comment_id', id)
  .del();
}


exports.fetchCommentById = (id) => {
  return knex('comments')
   .where('comment_id', id)
   .returning('*')
   .then(([comment]) => comment);
}