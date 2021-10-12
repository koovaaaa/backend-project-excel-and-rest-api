import { Body, Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ApiFile } from '../../decorator/api-file.decorator';
import setMulterConfig from '../../config/multer-config';
import { PathUploadEnum } from '../../enum/path-upload.enum';
import { FileNameDto } from './dto/file-name.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Excel')
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload-file')
  @ApiFile('excelFile', false, setMulterConfig(PathUploadEnum.EXCEL_FILE))
  async uploadExcelFile(@UploadedFile() file: Express.Multer.File) {
    return this.excelService.uploadExcelFile(file);
  }

  @Post('insert-to-database')
  async insertDataToDatabase(@Body() { filename, sheetName }: FileNameDto) {
    return await this.excelService.insertDataToDatabaseFromExcelFile(
      filename,
      sheetName,
    );
  }

  @Post('write-to-excel')
  async writeDataFromDatabaseToExcel() {
    return await this.excelService.writeDataFromDatabaseToExcel();
  }
}
