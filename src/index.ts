import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entieties/Post';
import microConfig from './mikro-orm.config';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { PostResolver } from './resolvers/post';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { MyContext } from './types';
import cors from 'cors';

dotenv.config();

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: 'qid',

      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'daSDAffefw4wgfethytkty',
      resave: false,
    })
  );

  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();
  const post = await orm.em.create(Post, { title: 'my first post 2' });
  // await orm.em.persistAndFlush(post)
  // const posts = await orm.em.find(Post,{});
  // console.log(posts)
  // console.log(post)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4000, () => console.log('Server runing on port 4000'));
};

main().catch((err) => console.log(err));
