import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { cleanAccents } from 'src/common/utils/cleanAccents';
import { storageBlog } from 'src/common/utils/files.storage';
import { responsFormat } from 'src/common/utils/formatRespon';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './interfaces/blog.interfaces';
import { Types } from 'mongoose';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'imageThumb', maxCount: 1 },
        { name: 'imageAlt', maxCount: 1 },
      ],
      storageBlog,
    ),
  )
  async createBlog(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      imageThumb?: Express.Multer.File[];
      imageAlt?: Express.Multer.File[];
    },
    @Body() createBlogDto: CreateBlogDto,
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
    const data = await this.blogService.createBlog(createBlogDto);
    return responsFormat(data);
  }

  @Get()
  async getAll(): Promise<Blog[]> {
    const data = await this.blogService.getAll();
    return responsFormat(data);
  }

  @Get('/getById/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.blogService.findOneById(id);
    return responsFormat(data);
  }

  @Get('/getById-category/:id')
  async getAllByCategory(@Param('id') id: string) {
    const data = await this.blogService.findByCategoryId(id);
    return responsFormat(data);
  }

  @Get('/getById-mutiple-lang/:id')
  async getByMutipleLang(@Param('id') id: string) {
    const data = await this.blogService.findByMutipleLang(id);
    return responsFormat(data);
  }

  @Delete('/deleteById/:id')
  async deleteOne(@Param('id') id: string) {
    return this.blogService.deleteOne(id);
  }
}
