import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { TaskType } from '../pages/TaskListView';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTaskSearch } from '../hooks/useTasks';
import { Spinner } from './Spinner';
import { ITask } from '../models/task';

interface IProps {
  taskType: TaskType;
  day: Date;
}

export const TaskColumn = ({ taskType, day }: IProps) => {
  const { isLoading, isError, data, error } = useTaskSearch({ taskType, taskStatus: 'none', date: day });

  const tasks = useMemo(() => {
    if (isError)
      return [
        { id: '1', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
        { id: '2', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
        { id: '3', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
        { id: '4', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
        { id: '5', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
        { id: '5', type: 'none', name: 'this is header', description: 'this is description', deadline: new Date() },
      ];
    return data;
  }, [isError]);

  return (
    <TaskColumnContainer>
      <TaskColumnHeader>
        <Typography variant="h6">
          {format(day, 'eeeeee dd MM yyyy', { locale: fi })} - Week {format(day, 'w', { locale: fi })}
        </Typography>
      </TaskColumnHeader>
      <TaskListContainer>
        {isLoading ? <Spinner /> : tasks?.map((task) => <Task key={task.id} task={task} />)}{' '}
      </TaskListContainer>
    </TaskColumnContainer>
  );
};

const TaskColumnContainer = styled(Box)`
  width: 30%;
  max-height: 750px;
  overflow-y: auto;
`;

const TaskColumnHeader = styled(Box)`
  background-color: cyan;
  padding: 5px;
  text-align: center;
`;

const TaskListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 5px;
`;
