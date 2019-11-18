
NC News Backend.

This serves as a RESTful API for my NC News Frontend UI. 

NC News is a social news page, housing articles of relative topics, social commentary, trending themes, their respective rating, and discussion. This platform has been built to inform and entertain, reminiscent of Reddit. NC News has articles which are divided into topics. Each article has user driven ratings and can be up or down voted using the API. Users can also add comments related to an an article, comments which can also be voted up or down, comments can also be removed by the author.


Getting Started:

Please ensure have installed Node.js and PostgreSQL.

feel free to run this repo on your own operating system then by to cloning it.  
Run npm install to install all required dependencies.

Testing and Development, will require you to create a knexfile.js, this should be added to your .gitignore file. 

Here is a blue print:

const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: 'nc_news',
      // username: "" << linux users only
      // password: "" << linux users only
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      // username: "", << linux users only
      // password: "", << linux users only
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

To seed the database run: "npm run seed" in your terminal.

Next step: "npm run dev", this will start up the local server.

Once the local server is up and running navigate your browser to localhost:9090/api. 
This endpoint describes all the available endpoints on this API.


To run tests type and run npm test in the terminal when in the repo. This will run tests using the Mocha test framework, Chai assertion library and the Supertest HTTP server testing library. First the API endpoints are tested followed by the utility functions necessary for seeding the data.

Built With
Express - The web framework used
API Routes
GET
/api Serves a json object representing all the available endpoints of the API

/api/topics Serves an array of all topics

/api/articles Serves an array of all articles

/api/users/:username Responds with a a user object with details about the given user

/api/articles/:article_id Responds with an article object for the given article ID

/api/articles/:article_id/comments When given a valid article ID, responds with an array of comments for that article

PATCH
/api/articles/:article_id Accepts an object in the form of { inc_votes: newVote} and responds with the updated article

/api/comments/:comment_id Accepts an object in the form of { inc_votes: newVote} and responds with the updated comment

POST
/api/articles/:article_id/comments Request body accepts an object in the form of {username: 'yourUsername', body: 'text'} and responds with the posted comment

DELETE
/api/comments/:comment_id Deletes the comment given by comment_id and responds with status 204


Future EndPoints:

#### More Routes

```http
POST /api/articles

DELETE /api/articles/:article_id

POST /api/topics

POST /api/users
GET /api/users
```
