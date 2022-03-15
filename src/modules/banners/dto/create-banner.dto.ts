import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}
