import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import './helper/database/init.dbs';
import router from './router/router';
import { NotFoundError } from './utils/core/error.res';

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', router);

// handling errors
app.use((req, res, next) => {
  const error = new NotFoundError('Not Found API endpoint');
  next(error);
}); // Middleware handler error

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 499;
  console.log(error.message);
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
  next();
});
export { app };
