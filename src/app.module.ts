import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukEntity } from './entity/produk.entity';
import { TerminalEntity } from './entity/terminal.entity';
import { ProdukTerminalEntity } from './entity/produkterminal.entity';
import { HttpModule } from '@nestjs/axios';
import { DetailPricePlanEntity } from './entity/detailpriceplan.entity';
import { PriceplanEntity } from './entity/priceplan.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),ScheduleModule.forRoot(),DatabaseModule,HttpModule,TypeOrmModule.forFeature([ProdukEntity,TerminalEntity,PriceplanEntity,ProdukTerminalEntity,DetailPricePlanEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
