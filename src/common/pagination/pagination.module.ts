import { Module } from '@nestjs/common';
import { HMACCursorService } from './hmac-cursor.service';

@Module({
  imports: [],
  exports: [HMACCursorService],
  providers: [HMACCursorService],
})
export class PaginationModule {}
