import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBlogDto {
  @IsString()
  image: string;

  @IsString()
  imageThumb: string;

  @IsString()
  imageAlt: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  title: Types.ObjectId;

  @IsNotEmpty()
  description: Types.ObjectId;

  @IsNotEmpty()
  categoryId: Types.ObjectId;
}
