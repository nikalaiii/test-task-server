// items.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Item } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: PaginateModel<Item>) {}

  async findAll(page: number, limit: number) {
    return this.itemModel.paginate({}, { page, limit, populate: 'owner' });
  }
}
