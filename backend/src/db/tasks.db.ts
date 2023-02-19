import { TaskStatus } from '@prisma/client';
import { addDays } from 'date-fns';
import { prisma } from '../app';
import { TaskCreateUpdateForm, TaskFilters } from '../types/tasks';
import { resetTime } from '../utils/dateUtils';

const getTasks = async (filters?: TaskFilters) => {
  const dateFilter = filters?.date
    ? {
        gte: resetTime(new Date(filters.date)),
        lt: resetTime(addDays(new Date(filters.date), 1))
      }
    : undefined;

  const result = await prisma.task.findMany({
    where: {
      date: dateFilter
    },
    include: {
      notes: true,
      drivers: true
    }
  });
  return result;
};

const getTaskById = async (taskId: string) => {
  const result = await prisma.task.findUnique({
    where: { taskId: taskId },
    include: {
      notes: true,
      drivers: true
    }
  });
  return result;
};

const createTask = async (task: TaskCreateUpdateForm) => {
  const result = await prisma.task.create({
    data: {
      ...task,
      status: TaskStatus.pending
    }
  });
  return result;
};

const updateTask = async (taskId: string, task: TaskCreateUpdateForm) => {
  const result = await prisma.task.update({
    where: { taskId: taskId },
    data: {
      ...task
    }
  });
  return result;
};

const deleteTask = async (taskId: string) => {
  await prisma.task.delete({
    where: { taskId: taskId }
  });
  return true;
};

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
