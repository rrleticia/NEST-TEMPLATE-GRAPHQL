import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [AdminsService],
  providers: [AdminsResolver, AdminsService],
})
export class AdminModule {}
