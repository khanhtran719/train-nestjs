import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
}
