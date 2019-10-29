const express = require('express');
const app = express();
const apiRouter = require('./routes/api-Router');
const {handleCustomErrors, psqlErrorHandler} = require('./Errors/index')




app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);

app.use(psqlErrorHandler);






module.exports = app;