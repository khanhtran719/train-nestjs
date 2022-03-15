import { Module } from '@nestjs/common';
import { CategoryModule } from './categories';
import { GroupModule } from './groups';
import { UserModule } from './users';

@Module({
  imports: [UserModule, GroupModule, CategoryModule],
})
export class ModelModule { }
