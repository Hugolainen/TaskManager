import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import styled from 'styled-components';
import { ITask } from '../models/task';

interface IProps {
  task: ITask;
}

export const Task = ({ task }: IProps) => {
  return (
    <Card>
      <CardHeader> {task.name} </CardHeader>
      <CardContent> {task.description} </CardContent>
      <CardActions>
        <Button> Take task </Button>
      </CardActions>
    </Card>
  );
};

const TaskContainer = styled.div`
  padding: 20px;
`;

const CardHeader2 = styled.div`
  background-color: lightblue;
`;
