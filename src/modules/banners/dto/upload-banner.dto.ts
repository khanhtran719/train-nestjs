import { IsString, IsNotEmpty } from 'class-validator';

export class UploadBannerDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}
