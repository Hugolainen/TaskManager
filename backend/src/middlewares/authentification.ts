import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import jwt from 'jsonwebtoken';
import config from '../config';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return generateError(401, '🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, config.jwtSecret);
    req.payload = payload;
  } catch (e) {
    handleCatchError(e);
  }
  return next();
}
