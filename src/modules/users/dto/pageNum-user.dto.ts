import { IsNotEmpty, IsNumber } from 'class-validator';

export class PageNumUserDto {
  @IsNotEmpty()
  @IsNumber()
  pageNum: number;
}
