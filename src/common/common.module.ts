import { Module } from '@nestjs/common';
import { LoggingPlugin } from './plugins/loggin.plugin';

@Module({
  exports: [],
  providers: [LoggingPlugin],
})
export class CommonModule {}
