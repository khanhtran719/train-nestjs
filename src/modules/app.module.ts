import { Module } from '@nestjs/common';
import { CategoryModule } from './categories';
import { GroupModule } from './groups';
import { UserModule } from './users';
import { BannerModule } from './banners';
import { BlogModule } from './blogs';
import { MutipleLanguagesModule } from './mutiple_lang';

@Module({
  imports: [
    UserModule,
    GroupModule,
    CategoryModule,
    BannerModule,
    BlogModule,
    MutipleLanguagesModule,
  ],
})
export class ModelModule {}
