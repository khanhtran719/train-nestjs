import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group, GroupSchema } from './schema/group.schema';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  exports: [GroupService],
})
export class GroupModule { }
