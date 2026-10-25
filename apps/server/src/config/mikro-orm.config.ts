import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { BaseRepository } from './base-repository.js';

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'your_db_name',
  user: 'your_db_user',
  password: 'your_db_password',
  host: 'localhost',
  port: 5432,

  // MikroORM에서 엔티티를 관리하기 위해 사용하는 기본 리포지토리 클래스를 지정합니다.
  entityRepository: BaseRepository,

  /**
   * Reflection : 프로그램이 실행 중에 자신의 구조를 들여다보고 분석하는 기술
   * MikroORM은 Reflection을 사용하여 엔티티의 구조를 분석하고, 이를 기반으로 데이터베이스 스키마를 생성하거나 업데이트합니다.
   */
  metadataProvider: TsMorphMetadataProvider,
  // 개발 환경에서 스키마 자동 업데이트 등을 원할 경우 아래 옵션 참고
  debug: true,
});
