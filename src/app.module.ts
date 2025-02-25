import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloDriverConfig,
  ApolloDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GqlConfigService } from './config/gql.config.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      // driver: ApolloFederationDriver,
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
