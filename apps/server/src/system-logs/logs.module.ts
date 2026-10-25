import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller.js';
import { LogsService } from './logs.service.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { Log } from './entities/log.entity.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Log])],
  controllers: [LogsController],
  providers: [LogsService, LogsRepository],
})
export class LogsModule {}
