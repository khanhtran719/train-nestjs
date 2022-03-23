import {
  Post,
  Get,
  Controller,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { responsFormat } from 'src/common/utils/formatRespon';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Roles(ROLE.Action)
  @Post('create')
  @HttpCode(201)
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    const data = await this.groupService.createGroup(createGroupDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get()
  @HttpCode(200)
  async getAllGroup() {
    const data = await this.groupService.getAllGroup();
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async findOneById(@Param('id') id: string) {
    const data = await this.groupService.findOneById(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Action)
  @Patch('/updateById/:id')
  @HttpCode(200)
  async updateById(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const data = await this.groupService.updateById(id, updateGroupDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Action)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async deleteOneById(@Param('id') id: string) {
    return this.groupService.deleteOneById(id);
  }
}
