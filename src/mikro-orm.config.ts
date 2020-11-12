import { __prod__ } from './constants';
import { Post } from './entieties/Post';
import path from 'path';
import dotenv from 'dotenv';
import { User } from './entieties/User';

dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: process.env.PGDATABASE,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  type: 'postgresql',
  debug: !__prod__,
} as Object;
