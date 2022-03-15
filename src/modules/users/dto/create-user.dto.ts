import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsObject()
  groupId: Types.ObjectId;
}
