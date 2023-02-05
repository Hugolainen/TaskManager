import { TaskDriver } from '@prisma/client';
import { prisma } from '../app';
import { TaskDriverCreateUpdateForm } from '../types/taskDrivers';

const getTaskDrivers = async (): Promise<TaskDriver[]> => {
  const result = await prisma.taskDriver.findMany();
  return result;
};

const getTaskDriverById = async (
  taskDriverId: string
): Promise<TaskDriver | null> => {
  const result = await prisma.taskDriver.findUnique({
    where: { taskDriverId: taskDriverId }
  });
  return result;
};

const createTaskDriver = async (
  taskDriver: TaskDriverCreateUpdateForm
): Promise<TaskDriver> => {
  const result = await prisma.taskDriver.create({
    data: {
      ...taskDriver,
      date: new Date()
    }
  });
  return result;
};

const updateTaskDriver = async (
  taskDriverId: string,
  taskDriver: TaskDriverCreateUpdateForm
): Promise<TaskDriver> => {
  const result = await prisma.taskDriver.update({
    where: { taskDriverId: taskDriverId },
    data: {
      ...taskDriver
    }
  });
  return result;
};

const deleteTaskDriver = async (taskDriverId: string): Promise<boolean> => {
  await prisma.taskDriver.delete({
    where: { taskDriverId: taskDriverId }
  });
  return true;
};

export default {
  getTaskDrivers,
  getTaskDriverById,
  createTaskDriver,
  updateTaskDriver,
  deleteTaskDriver
};
