import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => UserModel)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.service.getUserById(id);
  }
}
