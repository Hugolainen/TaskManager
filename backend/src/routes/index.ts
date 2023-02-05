import express from 'express';
import { logger } from '../utils/logger';
import createError from 'http-errors';

import userRoutes from './users.router';
import taskRoutes from './tasks.router';
import taskNoteRoutes from './taskNotes.router';
import taskDriverRoutes from './taskDrivers.router';

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
routes.use('/tasks', taskRoutes);
routes.use('/taskNotes', taskNoteRoutes);
routes.use('/taskDrivers', taskDriverRoutes);

export = routes;
