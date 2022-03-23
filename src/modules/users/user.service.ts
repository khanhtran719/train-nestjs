import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { user } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.groupId = await new Types.ObjectId(createUserDto.groupId);
    const createUser = new this.userModel(createUserDto);
    createUser.save();
    return {
      username: createUser.username,
      groupId: createUser.groupId,
      _id: createUser._id,
    };
  }

  async getAll(): Promise<user[]> {
    return await this.userModel
      .find()
      .select('_id username groupId')
      .sort({ username: 1 })
      .exec();
  }
  async findOneById(id: string): Promise<user> {
    return await this.userModel
      .findOne({ _id: id })
      .select('_id username groupId')
      .exec();
  }

  async findOneByName(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async findOneByGroupId(id: string): Promise<any> {
    return await this.userModel.findOne({ groupId: id });
  }

  async getUsersByGroupId(id: string): Promise<user[]> {
    return await this.userModel
      .find({ groupId: id })
      .select('_id username groupId')
      .sort({ username: 1 })
      .exec();
  }

  async getUsersByPageNum(
    page: number,
  ): Promise<{ users: User[]; total: number }> {
    const limit = 3;
    const offset = (page - 1) * limit;
    const allOfUser = await this.userModel
      .find()
      .select('_id username groupId')
      .exec();
    const users = [];
    for (let i = offset; i < page * limit; i++) {
      if (allOfUser[i]) {
        users.push(allOfUser[i]);
      }
    }
    return {
      users,
      total: users.length,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    if (user) {
      await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return await this.userModel
        .findById(id)
        .select('_id username groupId')
        .exec();
    }
    throw new NotFoundException();
  }

  async deleteOneById(id: string): Promise<User> {
    const user = this.userModel.findById(id);
    if (user) {
      return this.userModel.remove(user);
    }
    throw new NotFoundException();
  }
}
