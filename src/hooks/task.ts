import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const refetchIntervalMs = 1000;
export function useGetAllTasks() {
  return useQuery(
    'tasks',
    async () => {
      const { data } = await axios.get('/tasks');
      return data;
    },
    { refetchInterval: refetchIntervalMs },
  );
}

export function useGetTaskById(taskId: string) {
  return useQuery(['task', taskId], async () => {
    const { data } = await axios.get(`/tasks/${taskId}`);
    return data;
  });
}

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask) => axios.post('/tasks', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedTask) => axios.put(`/tasks/${id}`, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const useDeleteTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => axios.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
