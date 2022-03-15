import { IsString } from 'class-validator';

export class CreateMutipleLanguagesDto {
  @IsString()
  lang: string;

  @IsString()
  content: string;
}
