import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Group } from 'src/modules/groups/schema/group.schema';

export type UserDocument = User & Document;
const { ObjectId } = Types;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: ObjectId, required: true, ref: Group.name })
  groupId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
