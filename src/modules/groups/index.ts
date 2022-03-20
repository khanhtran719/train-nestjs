import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group, GroupSchema } from './schema/group.schema';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../src/assets/blogs'),
    }),
  ],
  exports: [GroupService],
})
export class GroupModule {}
