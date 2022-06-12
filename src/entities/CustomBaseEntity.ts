import { Index, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  @Index()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
