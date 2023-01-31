import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TaskColumn } from './TaskColumn';
import { TaskType } from '../pages/TaskListView';
import { addDays, subDays } from 'date-fns';
import { Box, Button } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const TaskCalendar = ({ taskType }: { taskType: TaskType }) => {
  const [activeDay, setActiveDay] = React.useState<Date>(new Date());
  const [dateRange1, setDateRange] = React.useState<number>(3);

  const dateRange = useMemo(() => {
    const dateList: Date[] = [];
    for (let i = 0; i < dateRange1; i++) {
      dateList.push(addDays(activeDay, i));
    }
    return dateList;
  }, [activeDay, dateRange1]);

  return (
    <TaskCalendarContainer>
      <FullHeightIconButton onClick={() => setActiveDay(subDays(activeDay, 1))}>
        <NavigateBeforeIcon fontSize="inherit" />
      </FullHeightIconButton>
      {dateRange.map((date) => (
        <TaskColumn key={date.getTime()} taskType={taskType} day={date} />
      ))}
      <FullHeightIconButton onClick={() => setActiveDay(addDays(activeDay, 1))}>
        <NavigateNextIcon fontSize="inherit" />
      </FullHeightIconButton>
    </TaskCalendarContainer>
  );
};

const TaskCalendarContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  min-height: 100%;
  padding: 20px;
`;

const FullHeightIconButton = styled(Button)`
  min-height: 100%;
  margin: 0;
  padding: 0;
  font-size: 60px;
  background-color: lightblue;
`;
