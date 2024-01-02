const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');

require('./helper/database/init.dbs.js');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/api/', require('./router/router.js'));

// const { questionModel } = require('./model/question/model.js');
// questionModel.create({
//   grade: 'fasdfj',
//   questionContent: {
//     questionType: 3333,
//     difficult: 1111,
//     contentQuestions: 'asdfjhkjhsdfkjhs',
//   },
// });

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}); // Middleware handler error

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(error.stack);
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
});

module.exports = app;
