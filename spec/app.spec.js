process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const connection = require('../db/connection');


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
    xit('status:404 for invalid url spelling', () => {
      return request(app)
        .get('/api/topic')
        .expect(404)
        .then(({error})  => {
          // console.log(error);
          expect(error).to.equal('No user found for username: notAUsername');
        });
    });
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
    it('status:404 for invalid username', () => {
      return request(app)
      .get('/api/users/notAUsername')
      .expect(404)
      .then(({text}) => {
        expect(text).to.equal('No user found for username: notAUsername');
      });
    });
  })
  describe('/api/articles/:article_id', ()=> {
    it('status:200 responds with the article as an object', () => {
      return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then(({body}) =>{
          expect(body).to.have.keys(['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count']);
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

})