import { TaskStatus, TaskType, UserStatus, UserType } from '@prisma/client';
import { addDays } from 'date-fns';
import { PrismaClient } from '@prisma/client';
import { logger } from '../src/utils/logger';
import { handleCatchError } from '../src/utils/errorUtils';
const prisma = new PrismaClient();

//https://www.prisma.io/docs/guides/database/seed-database

const loremIpsumDesc =
  'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut. Candy canes jelly macaroon pie topping. Apple pie cake liquorice bonbon chocolate cake chocolate tart. Cheesecake bonbon bonbon jelly beans pie pie oat cake marzipan croissant. Donut powder wafer cotton candy jelly-o candy chocolate bar candy. Lollipop tart fruitcake donut pastry carrot cake macaroon pudding. Halvah gummi bears marshmallow gingerbread icing topping.';

const loremIpsumTitle =
  'Cupcake ipsum dolor sit amet cake jelly sesame snaps donut.';

async function main() {
  await prisma.user.upsert({
    where: { username: 'supervisor' },
    update: {},
    create: {
      username: 'supervisor',
      password: 'supervisor',
      type: UserType.supervisor,
      status: UserStatus.active
    }
  });

  await prisma.user.upsert({
    where: { username: 'supervisor' },
    update: {},
    create: {
      username: 'driver',
      password: 'driver',
      type: UserType.driver,
      status: UserStatus.active
    }
  });

  await prisma.task.createMany({
    data: [
      {
        date: new Date(),
        type: TaskType.trash,
        title: loremIpsumTitle,
        description: loremIpsumDesc,
        status: TaskStatus.pending
      },
      {
        date: new Date(),
        type: TaskType.trash,
        title: loremIpsumTitle,
        description: loremIpsumDesc,
        status: TaskStatus.pending
      },
      {
        date: new Date(),
        type: TaskType.trash,
        title: loremIpsumTitle,
        description: loremIpsumDesc,
        status: TaskStatus.pending
      },
      {
        date: addDays(new Date(), 1),
        type: TaskType.trash,
        title: loremIpsumTitle,
        description: loremIpsumDesc,
        status: TaskStatus.pending
      },
      {
        date: addDays(new Date(), 1),
        type: TaskType.trash,
        title: loremIpsumTitle,
        description: loremIpsumDesc,
        status: TaskStatus.pending
      }
    ]
  });

  logger.info('Succesfully seeded DB');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    handleCatchError(e);
    await prisma.$disconnect();
    process.exit(1);
  });
