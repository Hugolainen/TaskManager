import { TaskNote } from '@prisma/client';
import { prisma } from '../app';
import { TaskNoteCreateUpdateForm } from '../types/taskNotes';

const getTaskNotes = async (): Promise<TaskNote[]> => {
  const result = await prisma.taskNote.findMany();
  return result;
};

const getTaskNoteById = async (
  taskNoteId: string
): Promise<TaskNote | null> => {
  const result = await prisma.taskNote.findUnique({
    where: { taskNoteId: taskNoteId }
  });
  return result;
};

const createTaskNote = async (
  taskNote: TaskNoteCreateUpdateForm
): Promise<TaskNote> => {
  const result = await prisma.taskNote.create({
    data: {
      ...taskNote,
      date: new Date()
    }
  });
  return result;
};

const updateTaskNote = async (
  taskNoteId: string,
  taskNote: TaskNoteCreateUpdateForm
): Promise<TaskNote> => {
  const result = await prisma.taskNote.update({
    where: { taskNoteId: taskNoteId },
    data: {
      ...taskNote
    }
  });
  return result;
};

const deleteTaskNote = async (taskNoteId: string): Promise<boolean> => {
  await prisma.taskNote.delete({
    where: { taskNoteId: taskNoteId }
  });
  return true;
};

export default {
  getTaskNotes,
  getTaskNoteById,
  createTaskNote,
  updateTaskNote,
  deleteTaskNote
};
