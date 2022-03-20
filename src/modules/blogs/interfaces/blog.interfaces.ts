import { Types } from 'mongoose';

export interface Blog {
  image: string;
  imageThumb: string;
  imageAlt: string;
  slug: string;
  title: string;
  description: Types.ObjectId;
  categoryId: Types.ObjectId;
}
