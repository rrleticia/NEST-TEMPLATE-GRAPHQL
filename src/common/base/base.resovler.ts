import { Type } from '@nestjs/common';
import { Args, Query, Mutation } from '@nestjs/graphql';
import { BaseService } from './base.service';
import { C } from 'vitest/dist/chunks/reporters.QZ837uWx';

export function BaseResolverFactory<
  T, // Model type (e.g., User)
  CreateInput, // Create DTO type (e.g., CreateUserInput)
  UpdateInput, // Update DTO type (e.g., UpdateUserInput)
  PaginatedOffset, // Offset pagination type (e.g., PaginatedOffsetUser)
  PaginatedCursor, // Cursor pagination type (e.g., PaginatedCursorUser)
  FetchPageOffsetArgs, // Offset argument type (e.g., FetchPageOffsetArgs)
  FetchPageCursorArgs, // Cursor argument type (e.g., FetchPageCursorArgs)
>(
  objectType: () => Type<T>,
  createInputType: () => Type<CreateInput>,
  updateInputType: () => Type<UpdateInput>,
  paginateOffsetType: () => Type<PaginatedOffset>,
  paginateCursorType: () => Type<PaginatedCursor>,
  fetchPageOffsetArgsType: () => Type<FetchPageOffsetArgs>,
  fetchPageCursorArgsType: () => Type<FetchPageCursorArgs>
) {
  // NOTE: We are NOT applying @Resolver here.
  abstract class BaseResolverClass {
    constructor(
      public readonly service: BaseService<
        T,
        CreateInput,
        UpdateInput,
        PaginatedOffset,
        PaginatedCursor
      >
    ) {}

    @Query(paginateOffsetType, { name: 'getWithOffset' })
    async findAllOffset(
      @Args('fetchPageArgs', { type: fetchPageOffsetArgsType })
      fetchPageArgs: FetchPageOffsetArgs
    ): Promise<PaginatedOffset> {
      return await this.service.findAllOffSet(fetchPageArgs);
    }

    @Query(paginateCursorType, { name: 'getWithCursor' })
    async findAllCursor(
      @Args('fetchPageArgs', { type: fetchPageCursorArgsType })
      fetchPageArgs: FetchPageCursorArgs
    ): Promise<PaginatedCursor> {
      return await this.service.findAllCursor(fetchPageArgs);
    }

    @Query(objectType, { name: 'get' })
    async findOne(@Args('id') id: string): Promise<T> {
      return this.service.findOneById(id);
    }

    @Mutation(objectType, { name: 'create' })
    async create(
      @Args('createInput', { type: createInputType })
      createInput: CreateInput
    ): Promise<T> {
      return await this.service.create(createInput);
    }

    @Mutation(objectType, { name: 'update' })
    async update(
      @Args('id') id: string,
      @Args('updateInput', { type: updateInputType })
      updateInput: UpdateInput
    ): Promise<T> {
      return await this.service.update(id, updateInput);
    }

    @Mutation(() => Boolean, { name: 'delete' })
    async delete(@Args('id') id: string): Promise<boolean> {
      return await this.service.delete(id);
    }
  }
  return BaseResolverClass;
}
