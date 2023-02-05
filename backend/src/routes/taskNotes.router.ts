import express from 'express';

import { taskNoteController } from '../controllers';

const taskNoteRoutes = express.Router();

taskNoteRoutes.get('/', taskNoteController.getAllTaskNotes);
taskNoteRoutes.get('/:taskNoteId', taskNoteController.getTaskNote);
taskNoteRoutes.post('/', taskNoteController.postTaskNote);
taskNoteRoutes.put('/:taskNoteId', taskNoteController.putTaskNote);
taskNoteRoutes.delete('/:taskNoteId', taskNoteController.deleteTaskNote);

export = taskNoteRoutes;
