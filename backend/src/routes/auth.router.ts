import express from 'express';
import authController from '../controllers/auth.controller';

const authRoutes = express.Router();

// https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
// https://javascript.plainenglish.io/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
authRoutes.post('/login', authController.login);
authRoutes.post('/:userId/refreshToken', authController.refreshToken);
authRoutes.post('/:userId/revokeToken', authController.revokeRefreshToken);

export = authRoutes;
