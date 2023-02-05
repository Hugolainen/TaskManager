import { Task, TaskStatus } from '@prisma/client';
import { prisma } from '../app';
import { TaskCreateUpdateForm } from '../types/tasks';

const getTasks = async (): Promise<Task[]> => {
  const result = await prisma.task.findMany();
  return result;
};

const getTaskById = async (taskId: string): Promise<Task | null> => {
  const result = await prisma.task.findUnique({ where: { taskId: taskId } });
  return result;
};

const createTask = async (task: TaskCreateUpdateForm): Promise<Task> => {
  const result = await prisma.task.create({
    data: {
      ...task,
      status: TaskStatus.pending
    }
  });
  return result;
};

const updateTask = async (
  taskId: string,
  task: TaskCreateUpdateForm
): Promise<Task> => {
  const result = await prisma.task.update({
    where: { taskId: taskId },
    data: {
      ...task
    }
  });
  return result;
};

const deleteTask = async (taskId: string): Promise<boolean> => {
  await prisma.task.delete({
    where: { taskId: taskId }
  });
  return true;
};

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
