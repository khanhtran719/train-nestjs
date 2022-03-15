import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
}
