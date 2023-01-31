import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

import { PrismaClient } from '@prisma/client';
import expressPino from 'express-pino-logger';
import { logger } from './utils/logger';

import helmet from 'helmet';

// DB connection
export const prisma = new PrismaClient();

const app = express();
const port = 3000;
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger
const expressLogger = expressPino({ logger });
app.use(expressLogger);

// Increase HTTP Header Security
app.use(helmet());

app.use('/api', routes);

app.listen(port, () => logger.info(`Server running on port ${port}!`));
