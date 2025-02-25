import { forwardRef, Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from '@src/database/database.module';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
