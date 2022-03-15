import { IsString, IsNotEmpty, IsObject } from 'class-validator';
// import { ObjectID } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsObject()
  groupId: string;
}
