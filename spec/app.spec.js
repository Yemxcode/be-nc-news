process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require('chai-sorted');
const expect = chai.expect;
const app = require("../app");
const connection = require('../db/connection');
chai.use(chaiSorted);

describe.only('/api', () => {

  beforeEach(() => {
    return connection.seed.run();
  });

  after(() => {
    connection.destroy();
  });

  describe('/topics', () => {
    it('status:200 Responds with the array topics with slug and description properties', () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body : {topics}}) => {
       expect(topics.length).to.equal(3);
       expect(topics[0]).to.have.keys(['slug', 'description']);
      });
    })
  })
  describe('ERRORS ->/topics', () => {
    it('status:404 for invalid url spelling', () => {
      return request(app)
        .get('/api/topic')
        .expect(404)
        .then(({body : {msg}}) => {
          expect(msg).to.equal('Route Not found :/, Please check the spelling of the URL and try again. Thank you :D');
        });
    });
    it('status:405 INVALID methods', () => {
      const invalidMethods = ['post', 'patch', 'put', 'delete'];
      const methodPromises = invalidMethods.map(method=> {
        return request(app)[method]('/api/topics')
          .expect(405)
          .then(({ body: { msg }}) => {
            expect(msg).to.equal('Unfortunately this method is not allowed with this route');
          })
      })
      return Promise.all(methodPromises);
    })
  })
  describe('/users/:username', () => {
    it('status:200 Responds with user object by username with the properties username, avatar_url_ and name', () => {
      return request(app)
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({body : {user}}) => {
        expect(user).to.have.keys(['username', 'avatar_url', 'name']);
      });
    });
  })
  describe('ERRORS ->/users/:username', () => {
    it('status:404 wrong url', () => {
      return request(app)
        .get('/api/users/')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('Route Not found :/, Please check the spelling of the URL and try again. Thank you :D');
        });
    });
    it('status:404 for invalid username', () => {
      return request(app)
        .get('/api/users/1234')
        .expect(404)
        .then(({error : {text}}) => {
          expect(text).to.equal('No user found for username: 1234');
        });
    });
    it('status:405 method not allowed',() => {
      const invalidMethods = ['post', 'patch', 'put', 'delete'];
      const methodPromises = invalidMethods.map(method => {
        return request(app)[method]('/api/users/:username')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unfortunately this method is not allowed with this route');
          })
      })
      return Promise.all(methodPromises);
    })
  });
  describe('/api/articles/:article_id', ()=> {
    it('status:200 responds with the article as an object', () => {
      return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then(({body}) =>{
          expect(body).to.contain.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
        })
    })
    it('status:200 responds with the updated article when an patch request is made', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes : -1 })
        .expect(200)
        .then(({ body }) => {
        expect(body.votes).to.equal(99);
      })
    })
  })
  describe('ERRORS ->/articles/:article_id', () => {
    it('status:404 correct id type but no article with the id', () => {
      return request(app)
        .get('/api/articles/222222/')
        .expect(404)
        .then(({error : {text}}) => {
          expect(text).to.equal('No article found for article_id: 222222')
        })
    })
    it('status:400 if id is not an integer', () => {
      return request(app)
        .get('/api/articles/two')
        .expect(400)
        .then(({body : {msg}}) => {
          expect(msg).to.equal('invalid input syntax for type integer: "two"');
        });
    });
    it('status:400 if there is no object passed as body', () => {
      return request(app)
        .patch('/api/articles/2')
        .send()
        .expect(400)
        .then(({error : {text}}) => {
          expect(text).to.equal('Please provide a body following the format: {inc_votes : 1}, if you provide multiple key values of this format in one body, the last one will be used');
        });                     
    })
    it('status:400 if the vote data type is wrong', () => {
      return request(app)
        .patch('/api/articles/2')
        .send({inc_votes : "two"})
        .expect(400)
        .then(({body: {msg}}) => {
          expect(msg).to.equal('invalid input syntax for type integer: "NaN"')
        })
    })
    it('status:404 if the id is correct data type by does not exist', () => {
      return request(app)
        .patch('/api/articles/222222')
        .send({ inc_votes: 2})
        .expect(404)
        .then(({error: {text}}) => {
          expect(text).to.equal('There is no current article with the provided id');
        })
    })
    it('status:422 if the body provided has two or more key value pairs of different key names', () => {
      return request(app)
        .patch('/api/articles/2')
        .send({ inc_votes: 2,  inc: 3 })
        .expect(422)
        .then(({error : {text}}) => {
          expect(text).to.equal('Please provide a single object body following the format: { inc_votes: 2}')
        })
    })
    it('status:405 method not allowed', () => {
      const invalidMethods = ['post', 'put', 'delete'];
      const methodPromises = invalidMethods.map(method => {
        return request(app)[method]('/api/articles/2')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unfortunately this method is not allowed with this route');
          })
      })
      return Promise.all(methodPromises);
    })
  }) 
  describe('/api/articles/:article_id/comments', () => {
    it('status:201 responds with object of posted comment', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({ username: 'rogersop', body: 'You call this an article?'})
        .expect(201)
        .then(({body}) => {
          expect(body).to.be.an('object');
          expect(body.author).to.equal('rogersop');
          expect(body.body).to.equal('You call this an article?');
        })
    })
    it('status:200 responds with an array of comments for article_id, defaults to the  order_by created at and desc',() => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) =>{
          expect(body).to.be.an('array');
          body.forEach(comment => 
            expect(comment).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body') 
          )
          expect(body).to.be.descendingBy('created_at');
          expect(body.length).to.equal(13);
        })
    })
    it('status:200 responds with an array sorted by query', () => {
      return request(app)
        .get('/api/articles/1/comments?sort_by=votes&order=desc')
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.descendingBy('votes');
          expect(body.length).to.equal(13);
        })
    })
  }) 
  describe('ERRORS ->/articles/:article_id/comments', () => {
    it('status:404 incorrect url', () => {
      return request(app)
        .post('/api/articles/2/comment')
        .send({ username: 'rogersop', body: 'You call this an article?' })
        .expect(404)
        .then(({body : {msg}}) => {
          expect(msg).to.equal("Route Not found :/, Please check the spelling of the URL and try again. Thank you :D")
        })
    })
    it('status:422 passed body is wrong data type', () => {
      return request(app)
        .post('/api/articles/2/comments')
        .send({ username: 'rogersop', body: 'You call this an article?', another: 1234})
        .expect(422)
        .then(({ error: { text } }) => {
          expect(text).to.equal("Please provide a single object body following the format: { username: '*Your Username*', body: '*Your comment*'}, if multiple key value of this format is provided in one object, the last will be accepted")
        })
    })
    it('status:200 responds with empty object if there is an article with no comment', () => {
      return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.an('array').that.is.empty
        })
    })
    it('status:400 responds psql error if id is wrong data type', () => {
      return request(app)
        .get('/api/articles/two/comments')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('invalid input syntax for type integer: "two"')
        })
    })
    it('status:400 psql column not found', () => {
      return request(app)
        .get('/api/articles/2/comments?sort_by=fake')
        .expect(400)
        .then(({body: {msg}}) => {
          expect(msg).to.equal('column "fake" does not exist')
        })
    })
    it('status:400 invalid order', () => {
      return request(app)
        .get('/api/articles/1/comments?sort_by=votes&order=whatever')
        .expect(400)
        .then(({error : {text}}) => {
          expect(text).to.equal(`Cannot use order whatever, has to be either 'asc' or 'desc'`)
        })
    })
    it('status:422 insufficient body', () => {
      return request(app)
        .post('/api/articles/2/comments')
        .send({ username: 'rogersop'})
        .expect(422)
    })
    it('status:405 method not allowed', () => {
      const invalidMethods = ['patch', 'put', 'delete'];
      const methodPromises = invalidMethods.map(method => {
        return request(app)[method]('/api/articles/2/comments')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Unfortunately this method is not allowed with this route');
          })
      })
      return Promise.all(methodPromises);
    })
  })
  describe('/api/articles', () => {
    it('status:200 responds with array of articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body : {articles}}) => {
          expect(articles).to.be.an('array');
        })
    })
    it('articles contain the valid keys, and defaults to sort_by date order desc', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article =>
            expect(article).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          )
          expect(articles).to.be.descendingBy('created_at');
        })
    })
    it('accepts queries, sort_by, order, author, topic', () => {
      return request(app)
        .get('/api/articles?sort_by=title&order=asc&author=icellusedkars&topic=mitch')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.ascendingBy('title');
          articles.forEach(article => 
            expect(article.topic).to.equal('mitch')
          )
          articles.forEach(article =>  
            expect(article.author).to.equal('icellusedkars')
          )
        })
    })
  })
  describe('/api/comments/:comment_id', () => {
    it('status:200 responds with an object with votes incremented', () => {
      return request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.an('object')
          expect(body.votes).to.equal(15)
        })
    })
    it('Responds with the comment with the comment id passed and vote decremented', () => {
      return request(app)
      .patch('/api/comments/2')
      .send({inc_votes: -1})
      .expect(200)
      .then(({body})=> {
        expect(body.comment_id).to.equal(2)
        expect(body.votes).to.equal(13);
      })
    })
    it('status:204 delete given comment by comment_id', () => {
      return request(app)
      .delete('/api/comments/2')
      .expect(204);
    })
    it('status:200 get comment gets comment', () => {
      return getComment = request(app)
        .get('/api/comments/2')
        .expect(200).then(({body}) => {
          expect(body).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
        })
    })
    it('Deletes the comment',() => {
      return request(app)
        .delete('/api/comments/2')
        .expect(204)
        .then(() => {
          return request(app)
            .get('/api/comments/2')
            .expect(200)
        }).then(({body}) => {
          expect(body).to.be.an('object').that.is.empty;
        })
    })
  })

})