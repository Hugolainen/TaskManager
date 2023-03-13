import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import { logger } from '../utils/logger';
import { authDb, usersDb } from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwtUtils from '../utils/jwt';
import jwt from 'jsonwebtoken';
import { hashToken } from '../utils/hashToken';
import { validationResult } from 'express-validator';

interface Login {
  username: string;
  password: string;
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

const login = async (
  req: TypedRequestBody<Login>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(200)
      .json({ err: 'Invalid Data Passed!', errors: errors });
  }

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
    const { accessToken, refreshToken } = jwtUtils.generateTokens(user, jti);
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
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, userId } = req.body;
    if (!refreshToken) {
      return generateError(400, 'Missing refresh token');
    }
    const payloadToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    );
    const savedRefreshToken = await authDb.getRefreshTokenById(
      payloadToken as string
    );

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return generateError(401, 'Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      return generateError(401, 'Unauthorized');
    }

    const user = await usersDb.getUserById(userId);
    if (!user) {
      return generateError(401, 'Unauthorized');
    }

    await authDb.deleteRefreshToken(savedRefreshToken.refreshTokenId);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } =
      jwtUtils.generateTokens(user, jti);
    await authDb.createRefreshToken({
      jti,
      refreshToken: newRefreshToken,
      userId: user.userId
    });
    logger.info(`Refreshed token #${newRefreshToken} for user id #${userId}`);
    res.send({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

const revokeRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    await authDb.revokeUserRefreshTokens(userId);
    logger.info(`Tokens revoked for user with id #${userId}`);
    res.send({ message: `Tokens revoked for user with id #${userId}` });
  } catch (e) {
    handleCatchError(e);
    next();
  }
};

export default {
  login,
  refreshToken,
  revokeRefreshToken
};
