import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { TaskDriver } from '@prisma/client';
import { taskDriversDb } from '../db';

const getAllTaskDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskDrivers: TaskDriver[] = await taskDriversDb.getTaskDrivers();

    if (!taskDrivers) {
      generateError(404, 'No taskDriver found');
    }

    logger.info(
      'Fetched taskDriver: ',
      taskDrivers.map((taskDriver) => taskDriver.taskDriverId).toString()
    );
    res.send(taskDrivers);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

const getTaskDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskDriverId = req.params.taskDriverId;
  try {
    const taskDriver = await taskDriversDb.getTaskDriverById(taskDriverId);

    if (!taskDriver) {
      return generateError(404, 'TaskDriver does not exist');
    }

    logger.info('Fetched taskDriver: ', taskDriver.taskDriverId);
    res.send(taskDriver);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Post TaskDriver
 * @param req
 * @param res
 * @param next
 */
const postTaskDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formTaskDriver = req.body;
  try {
    const taskDriver = await taskDriversDb.createTaskDriver(formTaskDriver);
    logger.info('Created new taskDriver: ', taskDriver);
    res.send(taskDriver);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Put TaskDriver
 * @param req
 * @param res
 * @param next
 */
const putTaskDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskDriverId = req.params.taskDriverId;
  const formTaskDriver = req.body;
  try {
    const updatedTaskDriver = await taskDriversDb.updateTaskDriver(
      taskDriverId,
      formTaskDriver
    );
    logger.info('Updated taskDriver: ', updatedTaskDriver);
    res.sendStatus(201);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Delete TaskDriver
 * @param req
 * @param res
 * @param next
 */
const deleteTaskDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskDriverId = req.params.taskDriverId;
    await taskDriversDb.deleteTaskDriver(taskDriverId);
    logger.info('Deleted taskDriver: ', taskDriverId);
    res.send(200); // Todo
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

export default {
  getAllTaskDrivers,
  getTaskDriver,
  postTaskDriver,
  putTaskDriver,
  deleteTaskDriver
};
