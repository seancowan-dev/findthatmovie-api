require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const usersRouter = require('../routes/routes.users');
const listsRouter = require('../routes/routes.lists');
const commentsRouter = require('../routes/routes.comments');
const auth = require('../middleware/auth');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet());
app.use(cors({
    origin: "*"
}));

app.use('/api/users', usersRouter);
app.use('/api/lists', listsRouter);
app.use('/api/comments', commentsRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;
        if (NODE_ENV === 'production') {
            response = { error: { message: 'server error' } };
        } else {
            console.error(error);
            response = { message: error.message, error };
        }
        res.status(500).json(response);
});

module.exports = app