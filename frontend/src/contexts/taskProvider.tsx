import * as React from 'react';
import { useGetTaskById, useAddTask, useUpdateTask } from '../hooks/useTasks';
import { ITask } from '../models/task';

interface IContext {
  task?: ITask;
  isLoading: boolean;
}
interface IReadProvider {
  taskId?: string;
  children: React.ReactNode;
}
const AuthContext = React.createContext<IContext>({
  task: undefined,
  isLoading: true,
});

const TaskProvider = ({ children, taskId }: IReadProvider) => {
  const { data, isLoading: isLoadingGet, isError: isErrorGet } = useGetTaskById(taskId);
  const { isLoading: isLoadingCreate, isError: isErrorCreate } = useAddTask();
  const { isLoading: isLoadingUpdate, isError: isErrorUpdate } = useUpdateTask(taskId);

  const isError = isErrorGet || isErrorCreate || isErrorUpdate;
  const isLoading = isLoadingGet || isLoadingCreate || isLoadingUpdate;
  const value = { task: data, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useTask = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTask };
