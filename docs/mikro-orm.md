# MirkoORM 가이드

## 패키지 설치

```
npm install @mikro-orm/core @mikro-orm/decorators @mikro-orm/nestjs @mikro-orm/postgresql @mikro-orm/reflection

npm install -D @mikro-orm/cli
```

## 설정 파일 작성

```typescript
// mikro-orm.config.ts
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default defineConfig({
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  dbName: "your_db_name",
  user: "your_db_user",
  password: "your_db_password",
  host: "localhost",
  port: 5432,
  metadataProvider: TsMorphMetadataProvider,
  // 개발 환경에서 스키마 자동 업데이트 등을 원할 경우 아래 옵션 참고
  // debug: true,
});
```

## 루트 설정

```typescript
// src/app.module.ts
import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import config from "../mikro-orm.config";

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    // 동적 설정이 필요할 경우:
    // MikroOrmModule.forRootAsync({ ... })
  ],
})
export class AppModule {}
```

## Entity 정의

```typescript
// src/users/entities/user.entity.ts
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}
```

## Feature 모듈 설정

```typescript
// src/users/users.module.ts
import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

## 서비스 레이어 구현

```typescript
// src/users/users.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({ name, email });
    await this.userRepository.getEntityManager().persistAndFlush(user);
    return user;
  }
}
```

## 참고사항

### CLI 설정

```json
"scripts": {
  "mikro-orm": "mikro-orm"
}
```

- 마이그레이션을 편리하게 관리할 수 있다.

### Request Context

- `@mikro-orm/nestjs`는 기본적으로 HTTP 요청마다 적절한 EntityManager 포크(Fork)를 관리해 주는 미들웨어를 제공하므로 대다수의 상황에서 별도의 컨텍스트 처리를 신경 쓰지 않아도 안전하게 동작합니다. 백그라운드 작업이나 별도 스레드에서 실행되는 로직인 경우 `@CreateRequestContext()` 데코레이터를 활용할 수 있다.
