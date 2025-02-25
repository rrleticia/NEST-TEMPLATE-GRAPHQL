import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '@src/database/database.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import JwtConfigService from '@src/config/jwt.config.service';
import { UsersModule } from '@src/users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  exports: [AuthService],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

