import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import styled from 'styled-components';
import { TaskCalendar } from '../components/TaskCalendar';

export enum TaskType {
  SEWER = 'Sewer',
  VAN = 'Van',
  TRASH = 'Trash',
}

export const DriverView = () => {
  const [selectedTaskType, setSelectedTaskType] = React.useState<TaskType>(TaskType.TRASH);
  // const TabPanel = ({ value, children }: { value: TaskType; children: React.ReactNode }) =>
  //   value === selectedTaskType ? <Box>{children}</Box> : null;

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
      {/* <TabPanel value={TaskType.SEWER}>Item One</TabPanel>
      <TabPanel value={TaskType.TRASH}>Item Two</TabPanel>
      <TabPanel value={TaskType.VAN}>Item Three</TabPanel> */}
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  vertical-align: top;
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const TabContainer = styled(Box)`
  border-bottom: 1px solid lightgrey;
`;

const ScTab = styled(Tab)`
  width: 20%;
`;
