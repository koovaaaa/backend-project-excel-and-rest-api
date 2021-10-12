import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
