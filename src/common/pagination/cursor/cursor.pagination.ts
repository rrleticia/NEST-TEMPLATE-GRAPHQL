import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { CursorMetadataType } from './cursor-metadata.type';

import { CursorDirection } from './cursor-edges.type';
import { Min, Max } from 'class-validator';

export interface IPaginatedType<T> {
  data: T[];
  meta: CursorMetadataType<T>;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;

    @Field(() => CursorDirection)
    direction: CursorDirection;
  }

  @ObjectType(`${classRef.name}sCursorMetadata`)
  abstract class CursorMetadataType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field((type) => Int, { nullable: true })
    @Min(0)
    @Max(50)
    limit: number;

    @Field((type) => Int, { nullable: false })
    @Min(0)
    @Max(50)
    itemCount: number;

    @Field((type) => Int, { nullable: false })
    @Min(0)
    remainCount: number;

    @Field((type) => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field((type) => Boolean, { nullable: false })
    hasNextPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => CursorMetadataType)
    meta: CursorMetadataType;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
