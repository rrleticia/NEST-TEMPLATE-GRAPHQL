import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { RolesGuard } from '@common/roles/roles.guard';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';

export const HttpFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

export const ErrorsInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ErrorsInterceptor,
};

export const AuthenticationGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const AppRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};
