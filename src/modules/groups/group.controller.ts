import {
  Post,
  Get,
  Controller,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './interfaces/group.interfaces';
import { GroupService } from './group.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { responsFormat } from 'src/common/utils/formatRespon';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    const data = await this.groupService.createGroup(createGroupDto);
    return responsFormat(data);
  }

  @Get()
  async getAllGroup(): Promise<Group[]> {
    const data = await this.groupService.getAllGroup();
    return responsFormat(data);
  }

  @Get('/getById/:id')
  async findOneById(@Param('id') id: string) {
    const data = await this.groupService.findOneById(id);
    return responsFormat(data);
  }

  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const data = await this.groupService.updateById(id, updateGroupDto);
    return responsFormat(data);
  }

  @Delete('/deleteById/:id')
  async deleteOneById(@Param('id') id: string) {
    return this.groupService.deleteOneById(id);
  }
}
