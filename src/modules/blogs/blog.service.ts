import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async createBlog(createBlogDto: CreateBlogDto) {
    const createBlog = new this.blogModel(createBlogDto);
    createBlog.save();
    return createBlog;
  }

  async getAll() {
    return this.blogModel.find().exec();
  }

  async findOneById(id: string) {
    return this.blogModel.findById(id);
  }

  async findByCategoryId(id: string) {
    return (await this.blogModel.find().exec()).filter(
      (blog) => id.toString() === blog.categoryId.toString(),
    );
  }

  async findByMutipleLang(id: string) {
    return (await this.blogModel.find().exec()).filter(
      (blog) => id.toString() === blog.title.toString(),
    );
  }

  async deleteOne(id: string): Promise<any> {
    const blog = await this.blogModel.findById(id);
    if (blog) {
      return this.blogModel.remove(blog);
    }
    throw new NotFoundException();
  }
}
