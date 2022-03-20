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
import { CreateMutipleLanguagesDto } from './dto/create-mutiple_lang.dto';
import { UpdateMutipleLanguagesDto } from './dto/update-mutiple_lang.dto';
import { MutipleLanguages } from './interfaces/mutiple_lang.interfaces';
import { MutipleLanguagesService } from './mutiple_lang.service';

@Controller('mutiple-lang')
export class MutipleLanguagesController {
  constructor(private mutiplelanguagesService: MutipleLanguagesService) {}

  @Post('create')
  async createMutipleLang(
    @Body() createMutipleLanguagesDto: CreateMutipleLanguagesDto,
  ) {
    const data = await this.mutiplelanguagesService.createMutipleLang(
      createMutipleLanguagesDto,
    );
    return responsFormat(data);
  }

  @Get()
  async getAll(): Promise<MutipleLanguages[]> {
    const data = await this.mutiplelanguagesService.getAll();
    return responsFormat(data);
  }

  @Patch('/updateById/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateMutipleLanguagesDto: UpdateMutipleLanguagesDto,
  ) {
    const data = await this.mutiplelanguagesService.updateById(
      id,
      updateMutipleLanguagesDto,
    );
    return responsFormat(data);
  }

  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: string) {
    return this.mutiplelanguagesService.deleteById(id);
  }
}
