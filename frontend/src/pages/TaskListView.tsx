import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import styled from 'styled-components';
import { TaskCalendar } from '../components/TaskCalendar';

export enum TaskType {
  SEWER = 'Sewer',
  VAN = 'Van',
  TRASH = 'Trash',
}

export const TaskListView = () => {
  const [selectedTaskType, setSelectedTaskType] = React.useState<TaskType>(TaskType.TRASH);
  return (
    <BaseContainer>
      <TabContainer>
        <Tabs value={selectedTaskType} onChange={(_, newTabIndex) => setSelectedTaskType(newTabIndex)}>
          <ScTab label={TaskType.SEWER} value={TaskType.SEWER} />
          <ScTab label={TaskType.TRASH} value={TaskType.TRASH} />
          <ScTab label={TaskType.VAN} value={TaskType.VAN} />
        </Tabs>
      </TabContainer>
      <TaskCalendar taskType={selectedTaskType}></TaskCalendar>
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  vertical-align: top;
  position: relative;
  margin: 0 auto;
  height: 80%;
  width: 100%;
`;

const TabContainer = styled(Box)`
  border-bottom: 1px solid lightgrey;
`;

const ScTab = styled(Tab)`
  width: 20%;
`;
