import { PaginationOrder } from '@common/enums/pagination-order.enum';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FetchPageArgs {
  @Field((type) => PaginationOrder, {
    nullable: true,
    defaultValue: PaginationOrder.ASC,
  })
  order: PaginationOrder;

  @Field((type) => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field((type) => Int, { nullable: true, defaultValue: 50 })
  limit?: number;
}
