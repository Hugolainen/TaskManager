import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Modal, Typography } from '@mui/material';
import styled from 'styled-components';
import { ITask } from '../models/task';

interface IProps {
  task: ITask;
}

export const Task = ({ task }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  return (
    <ScCard raised={isOpen} onClick={toggleIsOpen}>
      <ScCardHeader disableTypography title={task.title}></ScCardHeader>
      <CardContent> {task.description} </CardContent>
      <CardActions>
        <Button> Take task </Button>
      </CardActions>
    </ScCard>
  );
};

const ModalTest = () => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Text in a modal</h2>
        <p id="parent-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      </Box>
    </Modal>
  );
};

const ScCard = styled(Card)``;

const ScCardHeader = styled(CardHeader)`
  background-color: lightblue;
  color: black;
  font-size: 16px;
`;
