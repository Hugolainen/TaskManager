import express from 'express';

import { userController } from '../controllers';

const authRoutes = express.Router();

// https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
authRoutes.get('/', userController.getAllUsers);
authRoutes.get('/:userId', userController.getUser);
authRoutes.post('/', userController.postUser);
authRoutes.put('/:userId', userController.putUser);
authRoutes.put('/:userId/password', userController.putUserPassword);
authRoutes.delete('/:userId', userController.deleteUser);

export = authRoutes;
