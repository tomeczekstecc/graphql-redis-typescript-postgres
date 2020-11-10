import { __prod__ } from "./constants";
import { Post } from "./entieties/Post";
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()


export default {
  migrations: {
    path: path.join(__dirname,'./migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
    entities:[Post],
    dbName: 'lireddit',
    port: 5433,
    user: process.env.PGUSER,
    password:process.env.PGPASSWORD,
    type:'postgresql',
    debug:!__prod__  } as Object;