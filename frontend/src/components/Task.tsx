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
  const taskCardId = `taskCard_${task.id}`;
  return (
    <ScCard raised={isOpen} onClick={toggleIsOpen} id={taskCardId}>
      <ScCardHeader disableTypography title={task.title}></ScCardHeader>
      <CardContent> {task.description} </CardContent>
      <CardActions>
        <Button> Take task </Button>
      </CardActions>
      <ModalTest isOpen={isOpen} toggleModal={toggleIsOpen} taskCardId={taskCardId} />
    </ScCard>
  );
};

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  taskCardId: string;
}
const ModalTest = ({ isOpen, toggleModal, taskCardId }: ModalProps) => {
  return (
    <ScModalContainer
      open={isOpen}
      onClose={toggleModal}
      container={() => document.getElementById(taskCardId)}
      BackdropProps={{ style: { position: 'absolute' } }}
    >
      <ScModal>
        <Typography variant="h5">Text in a modal</Typography>
        <Typography variant="body1">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
      </ScModal>
    </ScModalContainer>
  );
};

const ScCard = styled(Card)`
  position: relative;
`;

const ScCardHeader = styled(CardHeader)`
  background-color: lightblue;
  color: black;
  font-size: 16px;
`;

const ScModalContainer = styled(Modal)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScModal = styled(Box)`
  background-color: white;
  color: black;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  padding: 10px;
  width: 60%;
`;
