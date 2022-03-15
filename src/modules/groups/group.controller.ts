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

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) { }

  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get()
  async getAllGroup(): Promise<Group[]> {
    return this.groupService.getAllGroup();
  }

  @Get('/getById/:id')
  async findOneById(@Param('id') id: string) {
    return this.groupService.findOneById(id);
  }

  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateById(id, updateGroupDto);
  }

  @Delete('/deleteById/:id')
  async deleteOneById(@Param('id') id: string) {
    return this.groupService.deleteOneById(id);
  }
}
