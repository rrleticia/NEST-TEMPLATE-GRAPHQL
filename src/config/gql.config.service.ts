import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: false,
      plugins: [decideEnv()],
      path: '/gql',
      autoSchemaFile: {
        path: join(process.cwd(), 'schema/schema.gql'),
        // federation: 2,
      },
      sortSchema: true,
      // buildSchemaOptions: {
      //   orphanedTypes: [User, ],
      // },
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, res }) => ({ req, res }),
    };
  }
}

function decideEnv(): any {
  return process.env.NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageProductionDefault({
        graphRef: 'my-graph-id@my-graph-variant',
        footer: false,
      })
    : ApolloServerPluginLandingPageLocalDefault({ footer: false });
}
