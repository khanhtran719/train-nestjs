import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from './schema/group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const createGroup = new this.groupModel(createGroupDto);
    createGroup.save();
    return createGroup;
  }

  async getAllGroup(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findOneById(id: string): Promise<Group> {
    return await this.groupModel.findById(id);
  }

  async updateById(id: string, updateGroupDto: UpdateGroupDto): Promise<any> {
    const group = await this.groupModel.findById(id);
    if (group) {
      await this.groupModel.findByIdAndUpdate(id, updateGroupDto);
      return await this.groupModel.findById(id);
    }
    throw new NotFoundException();
  }

  async deleteOneById(id: string): Promise<any> {
    const group = this.groupModel.findById(id);
    return this.groupModel.remove(group);
  }
}
