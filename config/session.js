import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './prisma.js';

const config = {
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}

const session = expressSession(config);

export { session };