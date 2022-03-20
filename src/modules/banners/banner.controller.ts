import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageBanner } from 'src/common/utils/files.storage';
import { responsFormat } from 'src/common/utils/formatRespon';
import { BannerService } from './banner.service';
import { UploadBannerDto } from './dto/upload-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storageBanner))
  async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadBannerDto: UploadBannerDto,
  ) {
    const data = await this.bannerService.uploadBanner(file, uploadBannerDto);
    return responsFormat(data);
  }
}
