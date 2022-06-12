import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { registerEnumType } from '@nestjs/graphql';
import { CustomBaseEntity } from './CustomBaseEntity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  @Unique()
  username!: string;

  @Enum(() => UserRole)
  role!: UserRole;
}
