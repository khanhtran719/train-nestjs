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
import { CreateMutipleLanguagesDto } from './dto/create-mutiple_lang.dto';
import { UpdateMutipleLanguagesDto } from './dto/update-mutiple_lang.dto';
import { MutipleLanguages } from './interfaces/mutiple_lang.interfaces';
import { MutipleLanguagesService } from './mutiple_lang.service';

@Controller('mutiple-lang')
export class MutipleLanguagesController {
  constructor(private mutiplelanguagesService: MutipleLanguagesService) {}

  @Roles(ROLE.Create)
  @Post('create')
  @HttpCode(201)
  async createMutipleLang(
    @Body() createMutipleLanguagesDto: CreateMutipleLanguagesDto,
  ) {
    const data = await this.mutiplelanguagesService.createMutipleLang(
      createMutipleLanguagesDto,
    );
    return responsFormat(data, 0, 'Success', []);
  }

  @Public()
  @Get()
  @HttpCode(200)
  async getAll(): Promise<MutipleLanguages[]> {
    const data = await this.mutiplelanguagesService.getAll();
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Update)
  @Patch('/updateById/:id')
  @HttpCode(200)
  async updateById(
    @Param('id') id: string,
    @Body() updateMutipleLanguagesDto: UpdateMutipleLanguagesDto,
  ) {
    const data = await this.mutiplelanguagesService.updateById(
      id,
      updateMutipleLanguagesDto,
    );
    return responsFormat(data, 0, 'Success', []);
  }

  @Roles(ROLE.Delete)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async deleteById(@Param('id') id: string) {
    return this.mutiplelanguagesService.deleteById(id);
  }
}
