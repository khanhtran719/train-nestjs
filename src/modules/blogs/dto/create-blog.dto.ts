import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBolgDto {
  @IsString()
  image: string;

  @IsString()
  imageThumb: string;

  @IsString()
  imageAlt: string;

  @IsString()
  slug: string;

  title: Types.ObjectId;
  description: Types.ObjectId;
  categoryId: Types.ObjectId;
}
