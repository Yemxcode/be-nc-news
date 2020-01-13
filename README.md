

# NC News Backend


NorthCoders News is a web platform similar to Reddit, a social news aggregation, web content rating, and discussion website.

NorthCders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

I have used Node.js, Express and PostgreSQL to build this application which will store articles, comments and users data and their relationships. Serving this information via RESTful endpoints. The frontend for this application utilises this data and presents it for the client.
___

## Getting Started

I have followed TDD (Test Driven Development) best practices while building this application. If you would like to see the tests in action or run the application locally instructions to do so are below.
___

## Prerequisites

_Please ensure you have Node and PSql installed, as you will not be able to run this application locally otherwise._
_To verify you have each installed you will need to open terminal window and run the following commands:_

```bash
which node    
which psql
```
If either/both command does not return a file path  
i.e  
_/usr/local/bin/node_      
_/usr/local/bin/psql_

You will need to follow the appropriate instructions installing below:
*  _Node (and npm)_    
*  _PSql_

After verifying you have installed both you can run a local version by completing the following steps:

* Open a terminal instance
* Clone this repository from GitHub by running git clone https://github.com/Yemxcode/be-nc-news.git in the terminal
* Add dependencies by typing **npm install** in the terminal
* Start a new terminal window and enter **npm run seed:dev** to add data to the database. This may take a few minutes as there's a fair amount of data. When the process is complete the console will display 'Database seeded' and the node process will terminate.
* You can then run the application using **npm run dev**
Running the tests
* To run the tests you will need to open a new terminal instance and **run npm test**. You will see the result of each test along with a brief explanation of the test.

_Testing and Development, will require you to create a knexfile.js, this should be added to your .gitignore file._
___

## Blueprint:

```javascript
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
```

___

## Routes


| METHOD |                 API                | HTTP STATUS | RESPONSE                                |
|:------:|:----------------------------------:|-------------|-----------------------------------------|
| GET    | /api/topics                        | 200         | Return all topics                       |
| GET    | /api/topics/:topic/articles        | 200         | Return all articles for a topic         |
| GET    | /api/articles                      | 200         | Return all articles                     |
| GET    | /api/articles/:article_id          | 200         | Return a single article by its ID       |
| GET    | /api/articles/:article_id/comments | 200         | Return all comments of single article   |
| GET    | /api/users                         | 200         | Return all Users                        |
| GET    | /api/users/:username               | 200         | Return single User by its username      |
| POST   | /api/articles                      | 201         | Add new Article to the database         |
| POST   | /api/users                         | 201         | Add new User to the database            |
| POST   | /api/topics                        | 201         | Add new Topic to the database           |
| POST   | /api/articles/:article_id/comments | 201         | Add new Comment to the database         |
| PATCH  | /api/articles/:article_id          | 200         | Increment/decrement votes on an Article |
| PATCH  | /api/comments/:comment_id          | 200         | Increment/decrement votes on a Comment  |
| DELETE | /api/articles/:article_id          | 204         | Remove an Article from the database     |
| DELETE | /api/comments/:comment_id          | 204         | Remove a Comment from the database      |
___

## Build steps:

* NodeJS - JavaScript runtime
* PostgreSQL - SQL database
* Express - Web Application Framework
___

## Testing:

```bash
npm install mocha, chai, supertest -D    
npm test
```
___

## Usage:

```bash
npm run setup-dbs  
npm run seed
```
___

## Acknowledgments   
>_Everyone at NorthCoders for their outstanding curriculum and support. They gave me the knowledge and confidence to build a career in Software Development._
