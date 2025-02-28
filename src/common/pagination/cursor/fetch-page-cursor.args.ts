import { PaginationOrder } from '@common/enums/pagination-order.enum';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FetchPageCursorArgs {
  @Field((type) => PaginationOrder, {
    nullable: true,
    defaultValue: PaginationOrder.ASC,
  })
  order: PaginationOrder;

  @Field((type) => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field((type) => String, { nullable: true })
  after?: string;
}
