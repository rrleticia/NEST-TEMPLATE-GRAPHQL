import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: '/gql',
      autoSchemaFile: {
        path: join(process.cwd(), 'schema/schema.gql'),
        // federation: 2,
      },
      sortSchema: true,
      // buildSchemaOptions: {
      //   orphanedTypes: [User, ],
      // },
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
