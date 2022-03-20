import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MutipleLanguagesController } from './mutiple_lang.controller';
import { MutipleLanguagesService } from './mutiple_lang.service';
import {
  MutipleLanguages,
  MutipleLanguagesSchema,
} from './schema/mutiple_lang.schema';

@Module({
  controllers: [MutipleLanguagesController],
  providers: [MutipleLanguagesService],
  imports: [
    MongooseModule.forFeature([
      { name: MutipleLanguages.name, schema: MutipleLanguagesSchema },
    ]),
  ],
  exports: [MutipleLanguagesService],
})
export class MutipleLanguagesModule {}
