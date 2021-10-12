import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { UserRepository } from '../../repository/user/user.repository';
import { PathUploadEnum } from '../../enum/path-upload.enum';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  uploadExcelFile(file) {
    return file;
  }

  async insertDataToDatabaseFromExcelFile(filename: string, sheetName: string) {
    const wb = xlsx.readFile(`uploads/excel-files/${filename}.xlsx`);
    const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);

    for (const user of data) {
      await this.userRepository.save({
        name: user['Name'],
        surname: user['Surname'],
        username: user['Username'],
        email: user['Email'],
        address: user['Address'],
        city: user['City'],
        yearOfBirth: user['Year of birth'],
      });
    }

    return data;
  }

  async writeDataFromDatabaseToExcel() {
    const users = await this.userRepository.find();

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(users);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    xlsx.writeFile(wb, `${PathUploadEnum.EXCEL_FILE}UsersFromDb.xlsx`);

    return users;
  }
}
