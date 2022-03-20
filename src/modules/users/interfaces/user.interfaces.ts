import { Types } from 'mongoose';

export interface user {
  username: string;
  groupId: Types.ObjectId;
  _id: Types.ObjectId;
}
