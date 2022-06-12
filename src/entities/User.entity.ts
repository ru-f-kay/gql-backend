import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  @Unique()
  username!: string;

  @Enum(() => UserRole)
  role!: UserRole;
}
