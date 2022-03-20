import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MutipleLanguagesDocument = MutipleLanguages & Document;

@Schema()
export class MutipleLanguages {
  @Prop({ required: true })
  lang: string;

  @Prop()
  content: string;
}

export const MutipleLanguagesSchema =
  SchemaFactory.createForClass(MutipleLanguages);
