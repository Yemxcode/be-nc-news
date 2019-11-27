
exports.up = function(knex) {
  return knex.schema.createTable('comments', (commentsTable)=> {
   commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('users.username').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    commentsTable.integer('article_id').references('articles.article_id').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
   commentsTable.integer('votes').defaultTo(0);
   commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
   commentsTable.text('body').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
