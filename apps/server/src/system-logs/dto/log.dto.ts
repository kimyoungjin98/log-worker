import { LogLevel, LogSource } from '../types/log.types.js';

export class LogDto {
  id!: string;
  message!: string;
  level!: LogLevel;
  source!: LogSource;
  environment!: string;
  instanceId!: string;
  metadata!: Record<string, unknown> | null;
  timestamp!: Date;
  createdAt!: Date;
}
