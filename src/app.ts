import helmet from 'helmet';
import morgan from 'morgan';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import compression from 'compression';
import './helper/database/init.dbs';
import router from './router/router';

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', router);

// handling errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}); // Middleware handler error

app.use((error: ErrorRequestHandler, req: Request, res: Response) => {
  console.log(error);
  const statusCode = error.status || 500;
  console.log(error.stack);
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
});

export { app };
