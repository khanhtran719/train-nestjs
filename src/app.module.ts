import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ModelModule } from './modules/app.module';

@Module({
  imports: [
    AuthModule,
    ModelModule,
    MongooseModule.forRoot('mongodb://localhost:27017/db-diagram'),
  ],
})
export class AppModule { }
