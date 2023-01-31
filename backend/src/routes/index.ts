import express from 'express';
import { logger } from '../utils/logger';
import userRoutes from './users.router';

import createError from 'http-errors';

const routes = express.Router();

routes.get('/', (req, res) => {
  try {
    logger.info('App is working');
    res.send('App is working');
  } catch (error) {
    const httpError = createError(500, 'App is not working');
    logger.error('App is working: ', error);
    throw httpError;
  }
});
routes.use('/users', userRoutes);

export = routes;
