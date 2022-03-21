import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { responsFormat } from 'src/common/utils/formatRespon';
import { PageNumUserDto } from './dto/pageNum-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Create)
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUser(createUserDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Read)
  @Get()
  async getAll() {
    const data = await this.userService.getAll();
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Read)
  @Get('/getById/:id')
  async findOneById(@Param('id') id: string) {
    const data = await this.userService.findOneById(id);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Read)
  @Get('/getUsers/byGroupId/:id')
  async getUsersByGroupId(@Param('id') id: string) {
    const data = await this.userService.getUsersByGroupId(id);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Read)
  @Get('/getUsersByPage')
  async getUsersByPageNum(@Body() pageNumUserDto: PageNumUserDto) {
    const data = await this.userService.getUsersByPageNum(pageNumUserDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Update)
  @Patch('/updateById/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Delete)
  @Delete('/deleteById/:id')
  async deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }
}
