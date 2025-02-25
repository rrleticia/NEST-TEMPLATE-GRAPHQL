import { PaginationOrder } from '@common/enums/pagination-order.enum';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FetchPageArgs {
  @Field((type) => PaginationOrder, {
    nullable: true,
    defaultValue: PaginationOrder.ASC,
  })
  order: PaginationOrder;

  @Field(() => Int, { defaultValue: 10 })
  take: number;

  @Field(() => String, { nullable: true })
  after?: string;
}
