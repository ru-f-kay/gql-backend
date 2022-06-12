import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/entities/User.entity';

@ObjectType('User')
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field(() => UserRole)
  role: UserRole;
}
