import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { cleanAccents } from 'src/common/utils/cleanAccents';
import { Types } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async createBlog(
    files: {
      image?: Express.Multer.File[];
      imageThumb?: Express.Multer.File[];
      imageAlt?: Express.Multer.File[];
    },
    createBlogDto: CreateBlogDto,
  ) {
    createBlogDto.image = files.image[0].path;
    createBlogDto.imageThumb = files.imageThumb[0].path;
    createBlogDto.imageAlt = files.imageAlt[0].path;
    createBlogDto.slug = cleanAccents(createBlogDto.slug)
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    createBlogDto.title = new Types.ObjectId(createBlogDto.title);
    createBlogDto.description = new Types.ObjectId(createBlogDto.description);
    createBlogDto.categoryId = new Types.ObjectId(createBlogDto.categoryId);
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
