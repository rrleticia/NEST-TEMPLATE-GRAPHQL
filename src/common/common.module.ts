import { Module } from '@nestjs/common';
import { LoggingPlugin } from './plugins/loggin.plugin';
import {
  HttpFilterProvider,
  ErrorsInterceptorProvider,
  AuthenticationGuard,
  AppRolesGuard,
} from './providers';

@Module({
  exports: [],
  providers: [
    LoggingPlugin,
    HttpFilterProvider,
    ErrorsInterceptorProvider,
    AuthenticationGuard,
    AppRolesGuard,
  ],
})
export class CommonModule {}
