import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interfaces';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateById(id, updateCategoryDto);
  }

  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: string) {
    return this.categoryService.deleteById(id);
  }
}
