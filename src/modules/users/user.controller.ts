import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUser(createUserDto);
    return {
      data: data,
      errorCode: 0,
      message: '',
      errors: [],
    };
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Create)
  @Get()
  async getAll(): Promise<any> {
    const data = await this.userService.getAll();
    return {
      data: data,
      errorCode: 0,
      message: '',
      errors: [],
    };
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
