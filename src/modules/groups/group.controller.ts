import {
  Post,
  Get,
  Controller,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { responsFormat } from 'src/common/utils/formatRespon';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    const data = await this.groupService.createGroup(createGroupDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Get()
  async getAllGroup() {
    const data = await this.groupService.getAllGroup();
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Get('/getById/:id')
  async findOneById(@Param('id') id: string) {
    const data = await this.groupService.findOneById(id);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const data = await this.groupService.updateById(id, updateGroupDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Delete('/deleteById/:id')
  async deleteOneById(@Param('id') id: string) {
    return this.groupService.deleteOneById(id);
  }
}
