import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.23.48.238:27017', {
      autoCreate: true,
      serverSelectionTimeoutMS: 2000,
      dbName: 'nest_main',
      user: 'root',
      pass: 'password',
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
