import { set } from 'date-fns';

export const resetTime = (date: Date) =>
  set(date, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });
