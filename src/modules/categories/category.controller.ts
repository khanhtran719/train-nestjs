import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { responsFormat } from 'src/common/utils/formatRespon';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interfaces';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return responsFormat(data);
  }

  @Get()
  async getAllCategory(): Promise<Category[]> {
    const data = await this.categoryService.getAllCategory();
    return responsFormat(data);
  }

  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.updateById(id, updateCategoryDto);
    return responsFormat(data);
  }

  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: string) {
    return this.categoryService.deleteById(id);
  }
}
