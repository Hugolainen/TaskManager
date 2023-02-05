import { TaskDriver } from '@prisma/client';

export type TaskDriverCreateUpdateForm = Omit<TaskDriver, 'taskDriverId'>;
