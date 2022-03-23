import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { responsFormat } from 'src/common/utils/formatRespon';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles(ROLE.Create)
  @Post('create')
  @HttpCode(201)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get()
  @HttpCode(200)
  async getAllCategory() {
    const data = await this.categoryService.getAllCategory();
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Update)
  @Patch('/updateById/:id')
  @HttpCode(200)
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.updateById(id, updateCategoryDto);
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Delete)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async deleteById(@Param('id') id: string) {
    return this.categoryService.deleteById(id);
  }
}
