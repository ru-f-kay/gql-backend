import { ConnectionArguments } from 'graphql-relay';

export interface PaginationResolver<T = unknown> {
  paginationParams: (args: ConnectionArguments) => T;
}
