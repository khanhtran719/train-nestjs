import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageBlog } from 'src/common/utils/files.storage';
import { responsFormat } from 'src/common/utils/formatRespon';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './interfaces/blog.interfaces';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Roles(ROLE.Create)
  @Post('/create')
  @HttpCode(201)
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
    const data = await this.blogService.createBlog(files, createBlogDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get()
  @HttpCode(200)
  async getAll(): Promise<Blog[]> {
    const data = await this.blogService.getAll();
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const data = await this.blogService.findOneById(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getById-category/:id')
  @HttpCode(200)
  async getAllByCategory(@Param('id') id: string) {
    const data = await this.blogService.findByCategoryId(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get('/getById-mutiple-lang/:id')
  @HttpCode(200)
  async getByMutipleLang(@Param('id') id: string) {
    const data = await this.blogService.findByMutipleLang(id);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Delete)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string) {
    return this.blogService.deleteOne(id);
  }
}
