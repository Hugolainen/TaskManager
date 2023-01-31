import pino from 'pino';

/*
 * Levels
 * Used: Info, warn, error, fatal
 * Not in use: debug, trace, silent
 */
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss p' // SYS: to use setup local timezone
    }
  }
});
