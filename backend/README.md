# GigManagerBE

Runs a migration based on schema.prisma
npx prisma migrate dev --name init

Starts app
yarn run start:dev

NOTE: DB password is "admin"

npx prisma generate

npx prisma migrate dev

## Dependencies

- Prisma (ORM)

## Structure

Routes -> Controllers -> Services -> db
src
│ index.js # Entry point for application
└───config # Application environment variables and secrets
└───controllers # Express controllers for routes, respond to client requests, call services
└───loaders # Handles all startup processes
└───middlewares # Operations that check or maniuplate request prior to controller utilizing
└───models # Database models
└───routes # Express routes that define API structure
└───services # Encapsulates all business logic
└───test # Tests go here
└───CRON # Tests go here
