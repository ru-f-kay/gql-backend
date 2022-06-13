import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';
import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationResolver } from './pagination/types';

@ArgsType()
export class RelayConnectionArgs implements ConnectionArguments {
  @Field({ nullable: true, description: 'Paginate before opaque cursor' })
  public before?: ConnectionCursor;

  @Field({ nullable: true, description: 'Paginate after opaque cursor' })
  public after?: ConnectionCursor;

  @Field({ nullable: true, description: 'Paginate first' })
  public first?: number;

  @Field({ nullable: true, description: 'Paginate last' })
  public last?: number;

  constructor(private readonly paginationResolver: PaginationResolver) {}

  paginationParams() {
    return this.paginationResolver.paginationParams(this);
  }
}
