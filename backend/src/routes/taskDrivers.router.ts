import express from 'express';

import { taskDriverController } from '../controllers';

const taskDriverRoutes = express.Router();

taskDriverRoutes.get('/', taskDriverController.getAllTaskDrivers);
taskDriverRoutes.get('/:taskDriverId', taskDriverController.getTaskDriver);
taskDriverRoutes.post('/', taskDriverController.postTaskDriver);
taskDriverRoutes.put('/:taskDriverId', taskDriverController.putTaskDriver);
taskDriverRoutes.delete(
  '/:taskDriverId',
  taskDriverController.deleteTaskDriver
);

export = taskDriverRoutes;
