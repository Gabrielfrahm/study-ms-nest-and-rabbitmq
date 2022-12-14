import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { config } from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
