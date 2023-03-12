import { Request, Response, NextFunction } from 'express';
import { generateError, handleCatchError } from '../utils/errorUtils';
import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const getJwtAccessSecret = (): string => {
  if (!JWT_ACCESS_SECRET) {
    throw new Error("it's shit");
  }

  return JWT_ACCESS_SECRET;
};

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
    const payload = jwt.verify(token, getJwtAccessSecret());
    req.payload = payload;
  } catch (e) {
    handleCatchError(e);
  }
  return next();
}
