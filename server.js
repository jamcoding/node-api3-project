const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/post', postRouter);
server.use('/api/user', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = server;
