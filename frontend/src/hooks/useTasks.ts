import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ISearchTaskQuery, ITask } from '../models/task';
import apiClient from './http-common';

const refetchIntervalMs = 1000;
export function useGetAllTasks() {
  return useQuery<ITask[]>(
    'tasks',
    async () => {
      const { data } = await apiClient.get('/tasks');
      return data;
    },
    { refetchInterval: refetchIntervalMs },
  );
}

export function useTaskSearch(searchParams: ISearchTaskQuery) {
  return useQuery<ITask[]>(
    ['taskSearch', searchParams.taskType, searchParams.taskStatus, searchParams.date],
    async () => {
      const { data } = await apiClient.post('/tasks/search', searchParams);
      return data;
    },
  );
}

export function useGetTaskById(taskId?: string) {
  return useQuery<ITask>(
    ['task', taskId],
    async () => {
      const { data } = await apiClient.get(`/tasks/${taskId}`);
      return data;
    },
    { enabled: !!taskId },
  );
}

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<ITask>({
    mutationFn: (newTask) => apiClient.post('/tasks', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<ITask>({
    mutationFn: (updatedTask) => apiClient.put(`/tasks/${taskId}`, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
