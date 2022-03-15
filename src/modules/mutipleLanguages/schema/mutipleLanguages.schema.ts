import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MutipleLanguagesDocument = MutipleLanguages & Document;

@Schema()
export class MutipleLanguages {
  @Prop({ unique: true })
  lang: string;

  @Prop({ required: true })
  content: string;
}

export const MutipleLanguagesSchema = SchemaFactory.createForClass(MutipleLanguages);
