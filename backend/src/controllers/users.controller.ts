import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { authDb, usersDb } from '../db';
import { exclude } from '../db/users.db';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersDb.getUsers();

    if (!users) {
      generateError(404, 'No user found');
    }

    logger.info('Fetched user: ', users.map((user) => user.userId).toString());
    res.send(users);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await usersDb.getUserById(userId);

    if (!user) {
      return generateError(404, 'User does not exist');
    }

    logger.info('Fetched user: ', user.userId);

    const cleanUser = exclude(user, ['password', 'createdAt', 'updatedAt']);
    res.send(cleanUser);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Post User
 * @param req
 * @param res
 * @param next
 */
const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const formUser = req.body;
  try {
    const user = await usersDb.createUser(formUser);
    logger.info('Created new user: ', user);
    res.send(user);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Put User
 * @param req
 * @param res
 * @param next
 */
const putUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const formUser = req.body;
  try {
    const user = await usersDb.updateUser(userId, formUser);
    logger.info('Updated user: ', user);
    res.sendStatus(201);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Put User password
 * @param req
 * @param res
 * @param next
 */
const putUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const formUserPassword = req.body;
    const user = await usersDb.getUserById(userId);
    if (!user) {
      return generateError(404, 'User does not exist');
    }
    if (user.password !== formUserPassword.currentPassword) {
      return generateError(401, 'User password does not match');
    }

    await usersDb.updateUser(userId, formUserPassword.newPassword);
    await authDb.revokeUserRefreshTokens(userId);
    logger.info(`Updated user password: ${userId}`);
    res.sendStatus(201);
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

/**
 * Delete User
 * @param req
 * @param res
 * @param next
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    await usersDb.deleteUser(userId);
    await authDb.revokeUserRefreshTokens(userId);
    logger.info('Deleted user: ', userId);
    res.send(200); // Todo
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

export default {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  putUserPassword,
  deleteUser
};
