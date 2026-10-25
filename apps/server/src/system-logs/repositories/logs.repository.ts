import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../config/base-repository.js';
import { Log } from '../entities/log.entity.js';

@Injectable()
export class LogsRepository extends BaseRepository<Log> {}
