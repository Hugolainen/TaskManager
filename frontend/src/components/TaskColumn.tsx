import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { TaskType } from '../pages/TaskListView';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTaskSearch } from '../hooks/useTasks';
import { Spinner } from './Spinner';
import { ITask } from '../models/task';

interface IProps {
  taskType: TaskType;
  day: Date;
}

export const TaskColumn = ({ taskType, day }: IProps) => {
  const { isLoading, isError, data = [], error } = useTaskSearch({ taskType, taskStatus: 'none', date: day });

  const tasks: ITask[] = useMemo(() => {
    if (isError)
      return [
        { id: '1', type: 'none', title: loremIpsumTitle + 'err', description: loremIpsumDesc, date: new Date() },
        { id: '2', type: 'none', title: loremIpsumTitle, description: loremIpsumDesc, date: new Date() },
        { id: '3', type: 'none', title: loremIpsumTitle, description: loremIpsumDesc, date: new Date() },
        { id: '4', type: 'none', title: loremIpsumTitle, description: loremIpsumDesc, date: new Date() },
        { id: '5', type: 'none', title: loremIpsumTitle, description: loremIpsumDesc, date: new Date() },
      ];
    return data;
  }, [isError]);

  return (
    <TaskColumnContainer>
      <TaskColumnHeader>
        <Typography variant="h6">
          {format(day, 'eeeeee dd MM yyyy', { locale: fi })} - Week {format(day, 'w', { locale: fi })}
        </Typography>
      </TaskColumnHeader>
      <TaskListContainer>
        {isLoading ? <Spinner /> : tasks?.map((task) => <Task key={task.id} task={task} />)}
      </TaskListContainer>
    </TaskColumnContainer>
  );
};

const loremIpsumDesc =
  'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut. Candy canes jelly macaroon pie topping. Apple pie cake liquorice bonbon chocolate cake chocolate tart. Cheesecake bonbon bonbon jelly beans pie pie oat cake marzipan croissant. Donut powder wafer cotton candy jelly-o candy chocolate bar candy. Lollipop tart fruitcake donut pastry carrot cake macaroon pudding. Halvah gummi bears marshmallow gingerbread icing topping.';

const loremIpsumTitle = 'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut.';

const TaskColumnContainer = styled(Box)`
  width: 44%;
  max-height: 750px;
  overflow-y: scroll;
`;

const TaskColumnHeader = styled(Box)`
  background-color: cyan;
  padding: 5px;
  text-align: center;
  margin-bottom: 5px;
`;

const TaskListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 10px;
`;
