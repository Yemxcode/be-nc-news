const knex = require('../db/connection');


exports.fetchArticleById = (id) => {
 return knex.select('articles.*')
  .from('articles')
  .where('articles.article_id', '=', id)
  .count({comment_count : 'articles.article_id'})
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