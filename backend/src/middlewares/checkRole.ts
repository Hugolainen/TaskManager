import { UserType } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { usersDb } from '../db';
import { generateError } from '../utils/errorUtils';

export const checkRole = (roles: UserType[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;
    try {
      const user = await usersDb.getUserById(userId);
      if (!user) {
        return generateError(404, 'User does not exist');
      }
      //Check if array of authorized roles includes the user's role
      if (roles.find((role) => role === user.type)) next();
      else res.status(401).send();
    } catch (e) {
      res.status(401).send();
    }
  };
};
