import type { LogDto } from './log.dto.js';
import { LogLevel, LogSource } from '../types/log.types.js';

export class CreateLogDto implements Omit<
  LogDto,
  'id' | 'createdAt' | 'metadata'
> {
  message!: string;
  level!: LogLevel;
  source!: LogSource;
  environment!: string;
  instanceId!: string;
  metadata?: Record<string, unknown> | null;
  timestamp!: Date;
}
