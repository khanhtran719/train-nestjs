import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MutipleLanguages,
  MutipleLanguagesDocument,
} from './schema/mutiple_lang.schema';
import { Model } from 'mongoose';
import { CreateMutipleLanguagesDto } from './dto/create-mutiple_lang.dto';
import { UpdateMutipleLanguagesDto } from './dto/update-mutiple_lang.dto';

@Injectable()
export class MutipleLanguagesService {
  constructor(
    @InjectModel(MutipleLanguages.name)
    private mutipleLanguagesModule: Model<MutipleLanguagesDocument>,
  ) {}

  async createMutipleLang(
    createMutipleLanguageDto: CreateMutipleLanguagesDto,
  ): Promise<MutipleLanguages> {
    const createMutipleLang = new this.mutipleLanguagesModule(
      createMutipleLanguageDto,
    );
    createMutipleLang.save();
    return createMutipleLang;
  }

  async getAll(): Promise<MutipleLanguages[]> {
    return this.mutipleLanguagesModule
      .find()
      .select('_id lang content')
      .sort({ lang: 1 })
      .exec();
  }

  async updateById(
    id: string,
    updateMutipleLanguagesDto: UpdateMutipleLanguagesDto,
  ): Promise<MutipleLanguages> {
    const lang = await this.mutipleLanguagesModule.findById(id);
    if (lang) {
      await this.mutipleLanguagesModule.findByIdAndUpdate(
        id,
        updateMutipleLanguagesDto,
      );
      return await this.mutipleLanguagesModule
        .findById(id)
        .select('_id lang content')
        .exec();
    }
    throw new NotFoundException();
  }

  async deleteById(id: string): Promise<any> {
    const lang = await this.mutipleLanguagesModule.findById(id);
    if (lang) {
      return this.mutipleLanguagesModule.remove(lang);
    }
    throw new NotFoundException();
  }
}
