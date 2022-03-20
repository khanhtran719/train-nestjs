import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { Banner, BannerSchema } from './schema/banner.schema';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/assets/banners'),
    }),
  ],
  exports: [BannerService],
})
export class BannerModule {}
