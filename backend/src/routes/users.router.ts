import express from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { userController } from '../controllers';
import { UserType } from '@prisma/client';

const userRoutes = express.Router();

userRoutes.get(
  '/',
  [checkJwt, checkRole([UserType.supervisor])],
  userController.getAllUsers
);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.post('/', userController.postUser);
userRoutes.put('/:userId', userController.putUser);
userRoutes.put('/:userId/password', userController.putUserPassword);
userRoutes.delete('/:userId', userController.deleteUser);

export = userRoutes;
