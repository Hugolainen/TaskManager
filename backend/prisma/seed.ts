import { TaskType, UserType } from '@prisma/client';
import { addDays } from 'date-fns';
import { usersDb, tasksDb } from '../src/db';

//https://www.prisma.io/docs/guides/database/seed-database

const loremIpsumDesc =
  'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut. Candy canes jelly macaroon pie topping. Apple pie cake liquorice bonbon chocolate cake chocolate tart. Cheesecake bonbon bonbon jelly beans pie pie oat cake marzipan croissant. Donut powder wafer cotton candy jelly-o candy chocolate bar candy. Lollipop tart fruitcake donut pastry carrot cake macaroon pudding. Halvah gummi bears marshmallow gingerbread icing topping.';

const loremIpsumTitle =
  'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut.';

const users = usersDb.getUsers();
users.then((users) => {
  const supervisor = users.find((user) => user.username === 'supervisor');
  const driver = users.find((user) => user.username === 'driver');
  if (!supervisor) {
    usersDb.createUser({
      username: 'supervisor',
      password: 'supervisor',
      type: UserType.supervisor
    });
  }
  if (!driver) {
    usersDb.createUser({
      username: 'driver',
      password: 'driver',
      type: UserType.driver
    });
  }
});

tasksDb.createTask({
  date: new Date(),
  type: TaskType.trash,
  title: loremIpsumTitle,
  description: loremIpsumDesc
});

tasksDb.createTask({
  date: new Date(),
  type: TaskType.trash,
  title: loremIpsumTitle,
  description: loremIpsumDesc
});

tasksDb.createTask({
  date: new Date(),
  type: TaskType.trash,
  title: loremIpsumTitle,
  description: loremIpsumDesc
});

tasksDb.createTask({
  date: addDays(new Date(), 1),
  type: TaskType.trash,
  title: loremIpsumTitle,
  description: loremIpsumDesc
});

tasksDb.createTask({
  date: addDays(new Date(), 1),
  type: TaskType.trash,
  title: loremIpsumTitle,
  description: loremIpsumDesc
});
