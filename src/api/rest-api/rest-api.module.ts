import { Module } from '@nestjs/common';
import { RestApiController } from './rest-api.controller';
import { RestApiService } from './rest-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entity/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [RestApiController],
  providers: [RestApiService],
})
export class RestApiModule {}
