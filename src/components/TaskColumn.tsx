import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { TaskType } from '../pages/DriverView';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IProps {
  taskType: TaskType;
  day: Date;
}

export const TaskColumn = ({ taskType, day }: IProps) => {
  return (
    <TaskColumnContainer>
      <TaskColumnHeader>
        <Typography variant="h6">
          {format(day, 'eeeeee dd MM yyyy', { locale: fi })} - Week {format(day, 'w', { locale: fi })}
        </Typography>
      </TaskColumnHeader>
      <TaskListContainer>
        <Task />
        <Task />
      </TaskListContainer>
    </TaskColumnContainer>
  );
};

const TaskColumnContainer = styled(Box)`
  width: 30%;
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
