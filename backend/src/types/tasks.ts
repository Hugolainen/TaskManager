import { Task } from '@prisma/client';

export type TaskCreateUpdateForm = Omit<Task, 'taskId' | 'status'>;

export type TaskFilters = {
  date?: Date;
};
