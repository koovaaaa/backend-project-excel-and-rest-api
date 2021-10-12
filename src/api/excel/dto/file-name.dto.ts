import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FileNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filename: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sheetName: string;
}
