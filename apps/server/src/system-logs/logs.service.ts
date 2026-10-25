import { Injectable } from '@nestjs/common';
import { LogsRepository } from './repositories/logs.repository.js';

@Injectable()
export class LogsService {
  constructor(private readonly logsRepository: LogsRepository) {}
}
