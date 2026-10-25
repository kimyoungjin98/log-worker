import { EntityRepository, FilterQuery } from '@mikro-orm/postgresql'; // or any other driver package

export class BaseRepository<
  Entity extends object,
> extends EntityRepository<Entity> {
  /**
   * 중복된 엔티티를 방지하기 위해, 주어진 조건에 맞는 엔티티가 존재하는지 확인합니다.
   * @param where
   * @returns
   */
  async exists(where: FilterQuery<Entity>): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }
}
