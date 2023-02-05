import { TaskNote } from '@prisma/client';

export type TaskNoteCreateUpdateForm = Omit<TaskNote, 'taskNoteId'>;
