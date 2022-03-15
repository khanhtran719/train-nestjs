import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/getById/:id')
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('/updateById/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/deleteById/:id')
  async deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }
}
