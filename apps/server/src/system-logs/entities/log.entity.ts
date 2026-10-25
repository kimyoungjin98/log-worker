import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { LogLevel, LogSource } from '../types/log.types.js';

@Entity({ tableName: 'logs' })
export class Log {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({
    type: 'text',
    name: '메시지',
    comment: '로그 메시지를 기록합니다.',
  })
  message!: string;

  @Property({
    type: 'enum',
    name: '로그 레벨',
    comment: '로그의 심각도를 나타내는 레벨을 기록합니다.',
  })
  level: LogLevel;

  @Property({
    type: 'enum',
    name: '로그 소스',
    comment: '로그의 출처를 기록합니다.',
  })
  source: LogSource;

  @Property({
    type: 'text',
    name: '개발 환경',
    comment: '개발 환경을 기록하여 로그를 구분할 수 있습니다.',
  })
  environment: string;

  @Property({
    type: 'text',
    name: '인스턴스 ID',
    comment:
      '같은 서비스의 서로 다른 인스턴스인 경우, 인스턴스 ID를 기록하여 로그를 구분할 수 있습니다.',
  })
  instanceId: string;

  @Property({
    type: 'jsonb',
    nullable: true,
    name: '메타데이터',
    comment: '로그와 관련된 추가 정보를 기록할 수 있습니다.',
  })
  metadata: Record<string, any> = {};

  @Property({
    type: 'timestamptz',
    name: '타임스탬프',
    comment: '로그가 발생한 시각을 기록합니다.',
  })
  timestamp: Date;

  @Property({
    type: 'timestamptz',
    name: '생성 시간',
    comment: '로그가 생성된 시각을 기록합니다.',
  })
  createdAt: Date = new Date();
}
