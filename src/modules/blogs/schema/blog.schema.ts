import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Category } from 'src/modules/categories/schema/category.schema';
import { MutipleLanguages } from 'src/modules/mutipleLanguages/schema/mutipleLanguages.schema';

export type BlogDocument = Blog & Document;
const { ObjectId } = Types;

@Schema()
export class Blog {
  @Prop()
  image: string;

  @Prop()
  imageThumb: string;

  @Prop()
  imageAlt: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ type: ObjectId, required: true, ref: MutipleLanguages.name })
  title: Types.ObjectId;

  @Prop({ type: ObjectId, required: true, ref: MutipleLanguages.name })
  description: Types.ObjectId;

  @Prop({ type: ObjectId, required: true, ref: Category.name })
  categoryId: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
