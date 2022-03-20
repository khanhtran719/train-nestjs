import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner, BannerDocument } from './schema/banner.schema';
import { Model } from 'mongoose';
import { UploadBannerDto } from './dto/upload-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async uploadBanner(
    file: Express.Multer.File,
    uploadBannerDto: UploadBannerDto,
  ): Promise<Banner> {
    uploadBannerDto.location = file.destination;
    uploadBannerDto.path = file.path;
    const uploadBanner = new this.bannerModel(uploadBannerDto);
    uploadBanner.save();
    return uploadBanner;
  }
}
