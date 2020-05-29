const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');
const userRouter = require('./routers/user')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(userRouter);


module.exports = app