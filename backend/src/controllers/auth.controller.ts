import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { User } from '@prisma/client';
import { authDb, usersDb } from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from '../utils/jwt';

const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return generateError(400, 'You must provide an email and an username');
    }

    const user = await usersDb.getUserByUsername(username);

    if (!user) {
      return generateError(404, 'No user found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return generateError(403, 'Invalid login credentials');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = jwt.generateTokens(user, jti);
    await authDb.createRefreshToken({
      jti,
      refreshToken,
      userId: user.userId
    });

    logger.info('Created new refreshToken: ', {
      userId: user.userId,
      accessToken,
      refreshToken
    });

    res.send({
      accessToken,
      refreshToken
    });
    next();
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

export default {
  authLogin
};
