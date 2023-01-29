import { useQuery } from 'react-query';
import axios from 'axios';

export function useLogin({ username, password }: string) {
  return useQuery(['login'], async () => {
    const { data } = await axios.get(`/tasks/${taskId}`);
    return data;
  });
}
