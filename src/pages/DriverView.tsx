import React from 'react';
import { Button, Chip, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { Task } from '../components/Task';

enum TaskType {
  SEWER = 'Sewer',
  VAN = 'Van',
  TRASH = 'Trash',
}

export const DriverView = () => {
  const [selectedTaskType, setSelectedTaskType] = React.useState<TaskType>(TaskType.TRASH);
  // DO TABS
  return (
    <BaseContainer>
      <InputLabel id='taskTypeSelect'>Task type</InputLabel>
      <SelectTaskType
        labelId='taskTypeSelect'
        id='taskTypeSelect'
        value={selectedTaskType}
        label='Task type'
        onChange={(e) => setSelectedTaskType(e.target.value as TaskType)}
      >
        <MenuItem value={TaskType.SEWER}>{TaskType.SEWER}</MenuItem>
        <MenuItem value={TaskType.TRASH}>{TaskType.TRASH}</MenuItem>
        <MenuItem value={TaskType.VAN}>{TaskType.VAN}</MenuItem>
      </SelectTaskType>

      <Task />
      <Task />
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  vertical-align: top;
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const SelectTaskType = styled(Select)`
  width: 300px;
`;
