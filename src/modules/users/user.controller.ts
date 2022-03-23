import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { responsFormat } from 'src/common/utils/formatRespon';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(ROLE.Create)
  @Post('/create')
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUser(createUserDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get()
  @HttpCode(200)
  async getAll(): Promise<User> {
    const data = await this.userService.getAll();
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async findOneById(@Param('id') id: string) {
    const data = await this.userService.findOneById(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getUsers/byGroupId/:id')
  @HttpCode(200)
  async getUsersByGroupId(@Param('id') id: string) {
    const data = await this.userService.getUsersByGroupId(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getUsersByPage/:page')
  @HttpCode(200)
  async getUsersByPageNum(@Param('page', ParseIntPipe) page: number) {
    const data = await this.userService.getUsersByPageNum(page);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Update)
  @Patch('/updateById/:id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Delete)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }
}
