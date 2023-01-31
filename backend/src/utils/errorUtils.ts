import { logger } from './logger';
import createError from 'http-errors';

export const getErrorMessage = (error: unknown) => {
  if (typeof error === 'string')
    return error.toUpperCase(); // works, `e` narrowed to string
  else if (error instanceof Error)
    return error.message; // works, `e` narrowed to Error
  else return `Unhandled error type: ${typeof error}, ${error}`;
};

export const handleCatchError = (error: unknown) => {
  const message = getErrorMessage(error);
  logger.error(message);
  const httpError = createError(500, message);
  throw httpError;
};

export const generateError = (httpStatusCode: number, message: string) => {
  logger.error(message);
  const httpError = createError(httpStatusCode, message);
  throw httpError;
};
