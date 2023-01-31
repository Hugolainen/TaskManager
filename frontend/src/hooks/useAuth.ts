import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IFormLoginInputs } from '../models/auth';
import apiClient from './http-common';

export function useSelf() {
  return useQuery(['self'], async () => {
    const { data } = await apiClient.get('/auth/self');
    // return data;
    return {};
  });
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: IFormLoginInputs) => apiClient.post('/auth/login', credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self'] });
    },
  });
};

export function useLogout() {
  return useQuery(['login'], async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  });
}

export default { useLogin, useLogout };
