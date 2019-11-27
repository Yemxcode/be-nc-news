const knex = require('../db/connection');




exports.fetchTopics = () => {
 return knex.select('*').from('topics').returning('*');
 
}


exports.insertTopic = (description, slug) => {
 return knex('topics')
  .insert({description, slug})
   .returning("*")
    .then(([topic]) => topic)
}