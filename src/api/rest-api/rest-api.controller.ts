import { Controller, Post } from '@nestjs/common';
import { RestApiService } from './rest-api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rest API')
@Controller('rest-api')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  @Post('write-to-db')
  async writeToDb() {
    return await this.restApiService.writeToDbFromExternalApi();
  }

  @Post('write-to-excel')
  async writePostsToExcel() {
    return await this.restApiService.writePostsToExcel();
  }
}
