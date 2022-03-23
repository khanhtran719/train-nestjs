import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/roles.enum';
import { storageBanner } from 'src/common/utils/files.storage';
import { responsFormat } from 'src/common/utils/formatRespon';
import { BannerService } from './banner.service';
import { UploadBannerDto } from './dto/upload-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Roles(ROLE.Action)
  @Post('/upload')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', storageBanner))
  async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadBannerDto: UploadBannerDto,
  ) {
    const data = await this.bannerService.uploadBanner(file, uploadBannerDto);
    return responsFormat(data, 0, 'Success', []);
  }
}
