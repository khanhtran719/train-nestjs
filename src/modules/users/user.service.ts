import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { PageNumUserDto } from './dto/pageNum-user.dto';
import { user } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const checkUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (checkUser) {
      throw new BadRequestException();
    }
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
    return await (
      await this.userModel.find().exec()
    ).map((user) => {
      return {
        username: user.username,
        groupId: user.groupId,
        _id: user._id,
      };
    });
  }
  async findOneById(id: string): Promise<user> {
    const user = await this.userModel.findById(id);
    return {
      username: user.username,
      groupId: user.groupId,
      _id: user._id,
    };
  }

  async findOneByName(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async findOneByGroupId(id: string): Promise<any> {
    return await this.userModel.findOne({ groupId: id });
  }

  async getUsersByGroupId(id: string): Promise<user[]> {
    const data = await this.userModel.find().exec();
    return data.filter((user) => user.groupId.toString() === id);
  }

  async getUsersByPageNum(
    pageNumUserDto: PageNumUserDto,
  ): Promise<{ users: User[]; total: number }> {
    const limit = 20;
    const page = pageNumUserDto.pageNum;
    const offset = (page - 1) * limit;
    const AllOfUser = await this.userModel.find().exec();
    const users = [];
    for (let i = offset; i < page * limit; i++) {
      if (AllOfUser[i]) {
        const objUser = {
          username: AllOfUser[i].username,
          groupId: AllOfUser[i].groupId,
          _id: AllOfUser[i]._id,
        };
        users.push(objUser);
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
      const newUser = await this.userModel.findById(id);
      return {
        username: newUser.username,
        groupId: newUser.groupId,
        _id: newUser._id,
      };
    }
    throw new NotFoundException();
  }

  async deleteOneById(id: string): Promise<User> {
    const user = this.userModel.findById(id);
    return this.userModel.remove(user);
  }
}
