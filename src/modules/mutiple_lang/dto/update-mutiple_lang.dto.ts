import { IsString } from 'class-validator';

export class UpdateMutipleLanguagesDto {
  @IsString()
  lang: string;

  @IsString()
  content: string;
}
