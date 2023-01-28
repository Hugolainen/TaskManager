import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import styled from 'styled-components';

export type Task = {
  id: string;
  type: string;
  mame: string;
  description: string;
  deadline: Date;
};

export const Task = () => {
  return (
    <Card>
      <CardHeader> This is a test HEADER </CardHeader>
      <CardContent> Content description </CardContent>
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
