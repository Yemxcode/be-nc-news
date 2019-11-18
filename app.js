const express = require('express');
const app = express();
const apiRouter = require('./routes/api-Router');
const {handleCustomErrors, psqlErrorHandler, handleServerErrors, RouteNotFound} = require('./Errors/index')



app.use(require('cors')())
app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);

app.use(psqlErrorHandler);


app.use(handleServerErrors);


app.all('/*', RouteNotFound);


module.exports = app;