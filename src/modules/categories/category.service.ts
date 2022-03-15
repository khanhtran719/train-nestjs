import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cleanAccents } from 'src/common/untils/cleanAccents';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    createCategoryDto.slug = cleanAccents(createCategoryDto.title)
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    const createCategory = new this.categoryModel(createCategoryDto);
    createCategory.save();
    return createCategory;
  }

  async getAllCategory(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async updateById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<any> {
    const category = await this.categoryModel.findById(id);
    if (category) {
      updateCategoryDto.slug = cleanAccents(updateCategoryDto.title)
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
      return await this.categoryModel.findById(id);
    }
    throw new NotFoundException();
  }

  async deleteById(id: string): Promise<any> {
    const category = await this.categoryModel.findById(id);
    if (category) {
      await this.categoryModel.remove(category);
      return {
        errorCode: 0,
        status_code: 200,
        message: 'Delete success',
      };
    }
    throw new NotFoundException();
  }
}
