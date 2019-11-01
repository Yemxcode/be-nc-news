const knex = require('../db/connection');



exports.changeCommentVote = (vote = 0, id) => {
 return knex('comments')
  .where('comment_id', id)
  .increment('votes', vote)
  .returning('*')
  .then(([comment])=> {
    if(!comment){
      return Promise.reject({
        status: 404,
        msg: `There is no comment with id: ${id}`
      });
    }
   return comment;
  })
}


exports.deleteCommentById = (id) => {
      return knex('comments')
        .where('comment_id', id)
        .del().then(response => {
          if(!response){
            return Promise.reject({
              status: 404,
              msg: `There is no comment with id: ${id}`
            });
          }
        })
}


