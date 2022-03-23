import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from './schema/group.schema';
import { UserService } from '../users/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private userService: UserService,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const createGroup = new this.groupModel(createGroupDto);
    createGroup.save();
    return createGroup;
  }

  async getAllGroup(): Promise<Group[]> {
    return this.groupModel
      .find()
      .select('_id name permission')
      .sort({ name: 1 })
      .exec();
  }

  async findOneById(id: string): Promise<Group> {
    const group = await this.groupModel
      .findById(id)
      .select('_id name permission')
      .exec();
    if (group) {
      return group;
    }
    throw new NotFoundException();
  }

  async updateById(id: string, updateGroupDto: UpdateGroupDto): Promise<any> {
    const group = await this.groupModel.findById(id);
    if (group) {
      await this.groupModel.findByIdAndUpdate(id, updateGroupDto);
      return await this.groupModel
        .findById(id)
        .select('_id name permission')
        .exec();
    }
    throw new NotFoundException();
  }

  async deleteOneById(id: string): Promise<any> {
    const checkExistUser = await this.userService.findOneByGroupId(id);
    if (checkExistUser) {
      throw new BadRequestException();
    }
    const group = this.groupModel.findById(id);
    return this.groupModel.remove(group);
  }
}
