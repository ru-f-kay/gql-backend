import * as Relay from 'graphql-relay';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import LimitOffsetPaginationData from './pagination/pagination-data';

const typeMap = {};

export abstract class RelayNodeType {
  @Field(() => ID)
  id!: number | string;
}

export default function makeRelayType<
  NodeExtenstionType extends RelayNodeType,
  PaginationDataType = LimitOffsetPaginationData,
>(
  nodeType: Type<NodeExtenstionType>,
  paginationDataType?: Type<PaginationDataType>,
): any {
  const { name } = nodeType;
  if (typeMap[`${name}`]) return typeMap[`${name}`];

  @ObjectType(`${name}Edge`, { isAbstract: true })
  class Edge implements Relay.Edge<NodeExtenstionType> {
    public name = `${name}Edge`;

    @Field({ nullable: true })
    public cursor!: Relay.ConnectionCursor;

    @Field(() => nodeType, { nullable: true })
    public node!: NodeExtenstionType;
  }

  @ObjectType(`${name}PageInfo`, { isAbstract: true })
  class PageInfo implements Relay.PageInfo {
    @Field({ nullable: true })
    public startCursor!: Relay.ConnectionCursor;

    @Field({ nullable: true })
    public endCursor!: Relay.ConnectionCursor;

    @Field(() => Boolean)
    public hasPreviousPage!: boolean;

    @Field(() => Boolean)
    public hasNextPage!: boolean;
  }

  @ObjectType(`${name}Connection`, { isAbstract: true })
  class Connection implements Relay.Connection<NodeExtenstionType> {
    public name = `${name}Connection`;

    @Field(() => [Edge], { nullable: true })
    public edges!: Relay.Edge<NodeExtenstionType>[];

    @Field(() => PageInfo, { nullable: true })
    public pageInfo!: Relay.PageInfo;
  }

  @ObjectType(`${name}Page`, { isAbstract: true })
  abstract class Page {
    public name = `${name}Page`;

    @Field(() => Connection)
    public page!: Connection;

    @Field(() => paginationDataType ?? LimitOffsetPaginationData, {
      nullable: true,
    })
    public pageData!: PaginationDataType;
  }

  typeMap[`${name}`] = Page;
  return typeMap[`${name}`];
}
