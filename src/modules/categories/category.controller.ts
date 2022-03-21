import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { responsFormat } from 'src/common/utils/formatRespon';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interfaces';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Get()
  async getAllCategory(): Promise<Category[]> {
    const data = await this.categoryService.getAllCategory();
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.updateById(id, updateCategoryDto);
    return responsFormat(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.Action)
  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: string) {
    return this.categoryService.deleteById(id);
  }
}
