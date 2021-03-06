import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: EntityRepository<User>,
  ) {}

  async getUsers(count?: number) {
    return this.repo.findAll({ limit: count });
  }

  getUserById(id: number) {
    return this.repo.findOneOrFail({ id });
  }
}
