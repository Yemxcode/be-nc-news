const knex = require('../db/connection');



exports.changeCommentVote = (vote, id) => {
  if(!vote){
    return Promise.reject({
      status: 400,
      msg: `Provide a vote for us process following the format: : {inc_votes : 1}`
    });
  }
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


