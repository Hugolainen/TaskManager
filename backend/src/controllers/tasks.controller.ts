import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { Task } from '@prisma/client';
import { tasksDb } from '../db';

enum SortingOrder {
  ASCENDING,
  DESCENDING
}

interface ISorter {
  field: string;
  order: SortingOrder;
}

interface IPagination {
  quantityPerPage: number;
  pageNumber: number;
}

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks: Task[] = await tasksDb.getTasks();

    if (!tasks) {
      generateError(404, 'No task found');
    }

    logger.info('Fetched task: ', tasks.map((task) => task.taskId).toString());
    res.send(tasks);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

const getFilteredTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filters = req.body;
  try {
    const tasks: Task[] = await tasksDb.getTasks(filters);

    if (!tasks) {
      generateError(404, 'No task found');
    }

    logger.info(
      'Fetched filtered task: ',
      tasks.map((task) => task.taskId).toString()
    );
    res.send(tasks);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.taskId;
  try {
    const task = await tasksDb.getTaskById(taskId);

    if (!task) {
      return generateError(404, 'Task does not exist');
    }

    logger.info('Fetched task: ', task.taskId);
    res.send(task);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Post Task
 * @param req
 * @param res
 * @param next
 */
const postTask = async (req: Request, res: Response, next: NextFunction) => {
  const formTask = req.body;
  try {
    const task = await tasksDb.createTask(formTask);
    logger.info('Created new task: ', task);
    res.send(task);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Put Task
 * @param req
 * @param res
 * @param next
 */
const putTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.taskId;
  const formTask = req.body;
  try {
    const task = await tasksDb.getTaskById(taskId);

    if (!task) {
      return generateError(404, 'Task does not exist');
    }

    const updatedTask = await tasksDb.updateTask(taskId, formTask);
    logger.info('Updated task: ', updatedTask);
    res.sendStatus(201);
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

/**
 * Delete Task
 * @param req
 * @param res
 * @param next
 */
const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await tasksDb.deleteTask(taskId);
    logger.info('Deleted task: ', taskId);
    res.send(200); // Todo
    next();
  } catch (e) {
    handleCatchError(e);
  }
};

export default {
  getAllTasks,
  getFilteredTasks,
  getTask,
  postTask,
  putTask,
  deleteTask
};
