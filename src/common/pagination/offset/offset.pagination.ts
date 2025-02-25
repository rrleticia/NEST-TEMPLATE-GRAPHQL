import { Type } from '@nestjs/common';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { OffsetMetadataType } from './offset-metadata.type';

export interface IPaginatedType<T> {
  data: T[];
  meta: OffsetMetadataType;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}sOffsetMetadata`)
  abstract class OffsetMetadataType {
    @Field((type) => Int, { nullable: true })
    @Min(0)
    page: number;

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
    pageCount: number;

    @Field((type) => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field((type) => Boolean, { nullable: false })
    hasNextPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => OffsetMetadataType)
    meta: OffsetMetadataType;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
