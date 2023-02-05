import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { TaskNote } from '@prisma/client';
import { taskNotesDb } from '../db';

const getAllTaskNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskNotes: TaskNote[] = await taskNotesDb.getTaskNotes();

    if (!taskNotes) {
      generateError(404, 'No taskNote found');
    }

    logger.info(
      'Fetched taskNote: ',
      taskNotes.map((taskNote) => taskNote.taskNoteId).toString()
    );
    res.send(taskNotes);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

const getTaskNote = async (req: Request, res: Response, next: NextFunction) => {
  const taskNoteId = req.params.taskNoteId;
  try {
    const taskNote = await taskNotesDb.getTaskNoteById(taskNoteId);

    if (!taskNote) {
      return generateError(404, 'TaskNote does not exist');
    }

    logger.info('Fetched taskNote: ', taskNote.taskNoteId);
    res.send(taskNote);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Post TaskNote
 * @param req
 * @param res
 * @param next
 */
const postTaskNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formTaskNote = req.body;
  try {
    const taskNote = await taskNotesDb.createTaskNote(formTaskNote);
    logger.info('Created new taskNote: ', taskNote);
    res.send(taskNote);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Put TaskNote
 * @param req
 * @param res
 * @param next
 */
const putTaskNote = async (req: Request, res: Response, next: NextFunction) => {
  const taskNoteId = req.params.taskNoteId;
  const formTaskNote = req.body;
  try {
    const updatedTaskNote = await taskNotesDb.updateTaskNote(
      taskNoteId,
      formTaskNote
    );
    logger.info('Updated taskNote: ', updatedTaskNote);
    res.sendStatus(201);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Delete TaskNote
 * @param req
 * @param res
 * @param next
 */
const deleteTaskNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskNoteId = req.params.taskNoteId;
    await taskNotesDb.deleteTaskNote(taskNoteId);
    logger.info('Deleted taskNote: ', taskNoteId);
    res.send(200); // Todo
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

export default {
  getAllTaskNotes,
  getTaskNote,
  postTaskNote,
  putTaskNote,
  deleteTaskNote
};
