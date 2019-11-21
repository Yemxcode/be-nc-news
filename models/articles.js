const knex = require("../db/connection");

exports.fetchArticleById = id => {
  return knex
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", id)
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`
        });
      }
      return article;
    });
};

exports.updateArticleById = (vote = 0, id) => {

  return knex("articles")
    .where({ article_id: id })
    .increment("votes", vote)
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "There is no current article with the provided id"
        });
      }
      return article;
    });
};

exports.insertCommentById = (id, user, comment) => {
      return knex("comments")
        .insert({ body: comment, author: user, article_id: id })
        .returning("*")
        .then(([comment]) => { 
            return comment
        })
};

exports.fetchCommentsById = (id, sort ="created_at", order = "desc") => {
  const validateArticle = () => { return knex('articles').where('article_id', id).then(([article]) => {
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: `There is no article by the id ${id}`
      })
    }
    return article
    })
  }

  if (order && !['asc', 'desc'].includes(order))
    return Promise.reject({
      status: 400,
      msg: `Cannot use order ${order}, has to be either 'asc' or 'desc'`
    });
  return knex("comments")
    .where("article_id", id)
    .returning("*")
    .orderBy(sort, order)
    .then(comments => {
      if (!comments.length) {
        return  Promise.all([comments, validateArticle()])}
      return [comments];
    });
};



exports.fetchArticles = (sort = "articles.created_at", order = "desc", author, topic) => {
  const validateTopic = () => {
    if(topic)
    return knex('topics').where('slug', topic).then(([response]) => {
      if (!response) {
        return Promise.reject({
          status: 404,
          msg: `We don't currently have an article with the topic: ${topic}`
        })
      }
    })
    return true;
  }

  const validateAuthor = () => {
    if(author)
    return knex('users').where('username', author).then(([response]) => {
      if (!response) {
        return Promise.reject({
          status: 404,
          msg: `There is no author by the name ${author}`
        })
      }
    })
    return true
  }
  
  if (order && !['asc', 'desc'].includes(order))
    return Promise.reject({
      status: 400,
      msg: `Cannot use order ${order}, has to be either 'asc' or 'desc'`
    });

  return knex
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort, order)
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .returning("*")
    .then((articles) => {
      if(!articles.length){
        return promises = Promise.all([[], validateTopic(), validateAuthor()]).then(([arr]) => arr)}
    return articles
    })
};


