

# NC News Backend


NorthCoders News is a web platform similar to Reddit, a social news aggregation, web content rating, and discussion website.

NorthCders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

I have used Node.js, Express and PostgreSQL to build this application which will store articles, comments and users data and their relationships. Serving this information via RESTful endpoints. The frontend for this application utilises this data and presents it for the client.
___
## Getting Started

I have followed TDD (Test Driven Development) best practices while building this application. If you would like to see the tests in action or run the application locally instructions to do so are below.
___
## Prerequisites

_Please ensure you have Node and PSql installed, as you will not be able to run this application locally otherwise._
_To verify you have each installed you will need to open terminal window and run the following commands:_

**which node**
**which psql**

If either/both command does not return a file path  
i.e  
_/usr/local/bin/node_ 
_/usr/local/bin/psql_
you will need to follow the appropriate instructions installing below:

_Node (and npm)_
_PSql_

After verifying you have installed both you can run a local version by completing the following steps:

* Open a terminal instance
* Clone this repository from GitHub by running git clone https://github.com/Yemxcode/be-nc-news.git in the terminal
* Add dependencies by typing **npm install** in the terminal
* Start a new terminal window and enter **npm run seed:dev** to add data to the database. This may take a few minutes as there's a fair amount of data. When the process is complete the console will display 'Database seeded' and the node process will terminate.
* You can then run the application using **npm run dev**
Running the tests
* To run the tests you will need to open a new terminal instance and **run npm test**. You will see the result of each test along with a brief explanation of the test.

_Testing and Development, will require you to create a knexfile.js, this should be added to your .gitignore file._

## Blue print:

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
// username: "" << _linux users only_
// password: "" << _linux users only_
},
},
test: {
connection: {
database: 'nc_news_test',
// username: "", << _linux users only_
// password: "", << _linux users only_
},
},
production: {
connection: `${DB_URL}?ssl=true`,
},
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

What's tested?
Each of the applications endpoints, with both successful and unsuccessful requests (where applicable).

## Routes

> GET /api/topics - Return all topics
> GET /api/topics/:topic/articles - Return all articles for a particular topic ID
> GET /api/articles - Return all articles
> GET /api/articles/:article_id/ - Return an individual article by its ID
> GET /api/articles/:article_id/comments - Return all comments for a single article ID
> POST /api/articles/:article_id/comments - Add a new comment to the appropriate article ID
> PUT /api/articles/:article_id - Increment/decrement votes on an article
> PUT /api/comments/:comment_id - Increment/decrement votes on a comment
> DELETE /api/comments/:comment_id - Delete a comment with the correlating id 
> GET /api/users - Return all user profiles
> GET /api/users/:username - Return a user profile along with their articles and comments
> POST /api/articles - Add a new article published by a specific user
> POST /api/users - Add a new user to the database
> POST /api/topics - Add a new topic to the database
> DELETE /api/articles/:article_id - Delete an article with the correlating id


## Build steps:

* NodeJS - JavaScript runtime
* PostgreSQL - SQL database
* Express - Web Application Framework

## Testing:

**npm install mocha, chai, supertest -D**
**npm test**

## Usage:

**npm run setup-dbs**
**npm run seed**

## Acknowledgments
_Everyone at NorthCoders for their outstanding curriculum and support. They gave me the knowledge and confidence to build a career in Software Development._
