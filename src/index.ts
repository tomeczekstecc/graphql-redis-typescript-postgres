import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entieties/Post';
import microConfig from './mikro-orm.config';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
dotenv.config();

const main = async () => {
  const app = express();
  const orm = await MikroORM.init(microConfig);
  // orm.getMigrator().up()
  const post = await orm.em.create(Post, { title: 'my first post 2' });
  // await orm.em.persistAndFlush(post)
  // const posts = await orm.em.find(Post,{});
  // console.log(posts)
  // console.log(post)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => console.log('Server runing on port 4000'));
};

main().catch((err) => console.log(err));
