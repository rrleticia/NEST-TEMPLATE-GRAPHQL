import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GqlConfigService } from './config/gql.config.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerMiddleware } from '@common/middleware';
import {
  HttpFilterProvider,
  ErrorsInterceptorProvider,
  AuthenticationGuard,
  AppRolesGuard,
} from '@common/providers';
import { AdminModule } from './admins/admins.module';

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
    AdminModule,
  ],
  controllers: [],
  providers: [
    HttpFilterProvider,
    ErrorsInterceptorProvider,
    AuthenticationGuard,
    AppRolesGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes('user');
  }
}
