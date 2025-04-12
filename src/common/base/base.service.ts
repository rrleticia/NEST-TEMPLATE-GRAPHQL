import { CursorMetadataType } from '@common/pagination/cursor';
import { OffsetMetadataType } from '@common/pagination/offset';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

export abstract class BaseService<
  T, // The model type (e.g. User)
  CreateInput, // Input type for create operations
  UpdateInput, // Input type for update operations
  PaginatedOffset, // Type for offset pagination responses
  PaginatedCursor, // Type for cursor pagination responses
> {
  constructor(protected readonly repository: any) {}

  async findAllOffSet(fetchPageArgs: any): Promise<PaginatedOffset> {
    try {
      const { order, page, limit } = fetchPageArgs;

      const { users, itemCount } = await this.repository.findAllOffset(
        order,
        limit,
        page
      );

      const metadataOffset = new OffsetMetadataType({
        fetchPageArgs,
        itemCount,
      });

      return { data: users, meta: metadataOffset } as PaginatedOffset;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllCursor(fetchPageArgs: any): Promise<PaginatedCursor> {
    try {
      const { order, limit, after } = fetchPageArgs;

      const { users, itemCount, remainCount, edges } =
        await this.repository.findAllCursor(order, limit, after);

      const metadataCursor = new CursorMetadataType({
        limit,
        itemCount,
        remainCount,
        edges,
      });

      return { data: users, meta: metadataCursor } as PaginatedCursor;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneById(id: string): Promise<T> {
    try {
      const item = await this.repository.findOneById(id);
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createInput: CreateInput): Promise<T> {
    try {
      return await this.repository.create(createInput);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateInput: UpdateInput): Promise<T> {
    try {
      return await this.repository.update(id, updateInput);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
