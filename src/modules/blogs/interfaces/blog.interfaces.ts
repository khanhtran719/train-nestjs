import { Types } from 'mongoose';

export interface Bolg {
  image: string;
  imageThumb: string;
  imageAlt: string;
  slug: string;
  title: Types.ObjectId;
  description: Types.ObjectId;
  categoryId: Types.ObjectId;
}
