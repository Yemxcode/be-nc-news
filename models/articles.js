const knex = require('../db/connection');


exports.fetchArticleById = (id) => {
 return knex.select('articles.*')
  .from('articles')
  .where('articles.article_id', '=', id)
  .count({comment_count : 'comments.article_id'})
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id').then(([article]) => {
  if (!article) {
   return Promise.reject({
    status: 404,
    msg: `No article found for article_id: ${id}`
   });
  }
  return article;
 });
}

exports.updateArticleById = (vote, id) => {
  return knex('articles')
  .where({article_id : id})
  .increment('votes', vote)
  .returning('*')
  .then(([article]) => {
   return article;
  });
}


exports.insertCommentById = (id, user, comment) => {
 const validateUser = knex('users').where('username', user).returning('*')
 return validateUser.then(([user]) => {
  if(user)
   return knex('comments')
    .insert({ body: comment, author: user.username, article_id: id }).returning('*').then(([comment]) => comment)
  else
   return Promise.reject({
    status: 404,
    msg: `No user found for username: ${user}`
   });
 })
}


exports.fetchCommentsById = (id, sort = 'created_at', order = 'desc') => {
 return knex('comments').where('article_id', id).returning('*')
 .orderBy(sort, order).then(comments => comments);
}



exports.fetchArticles = (sort = 'articles.created_at', order = 'desc', author, topic) => {
  
  return knex.select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id').orderBy(sort, order).modify((query) => {
      if (author) query.where('articles.author', author );
      if (topic) query.where('articles.topic', topic );
    }).returning('*').then(articles => articles).catch(console.log)
}

