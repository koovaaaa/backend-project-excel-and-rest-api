import { Module } from '@nestjs/common';
import { ExcelModule } from './api/excel/excel.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm-config';
import { RestApiModule } from './api/rest-api/rest-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),
    ExcelModule,
    RestApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
