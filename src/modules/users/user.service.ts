import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const createUser = new this.userModel(createUserDto);
    createUser.save();
    return createUser;
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByName(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    if (user) {
      await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return await this.userModel.findById(id);
    }
    throw new NotFoundException();
  }
  async deleteOneById(id: string): Promise<User> {
    const user = this.userModel.findById(id);
    return this.userModel.remove(user);
  }
}
