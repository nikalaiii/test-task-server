import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PaginateModel } from 'mongoose';

export type ItemDocument = Item & Document;

export type ItemModel = PaginateModel<ItemDocument>;

@Schema()
export class Item {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// 4. Підключення плагіна пагінації
ItemSchema.plugin(mongoosePaginate);
