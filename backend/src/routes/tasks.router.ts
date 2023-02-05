import express from 'express';

import { taskController } from '../controllers';

const taskRoutes = express.Router();

taskRoutes.get('/', taskController.getAllTasks);
taskRoutes.post('/search', taskController.getFilteredTasks);
taskRoutes.get('/:taskId', taskController.getTask);
taskRoutes.post('/', taskController.postTask);
taskRoutes.put('/:taskId', taskController.putTask);
taskRoutes.delete('/:taskId', taskController.deleteTask);

export = taskRoutes;
