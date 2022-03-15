import { Types } from 'mongoose';

export interface User {
  username: string;
  password: string;
  groupId: Types.ObjectId;
}
