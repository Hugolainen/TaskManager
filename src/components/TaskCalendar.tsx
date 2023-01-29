import React from 'react';
import styled from 'styled-components';
import { TaskColumn } from './TaskColumn';
import { TaskType } from '../pages/DriverView';

export const TaskCalendar = ({ taskType }: { taskType: TaskType }) => {
  return (
    <TaskCalendarContainer>
      <TaskColumn taskType={taskType} day={new Date()} />
      <TaskColumn taskType={taskType} day={new Date()} />
      <TaskColumn taskType={taskType} day={new Date()} />
    </TaskCalendarContainer>
  );
};

const TaskCalendarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;
