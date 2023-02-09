import { Injectable } from '@nestjs/common';
import { read, IWorkBook } from 'ts-xlsx';

@Injectable()
export class ProductsService {
  async readExcel(excel: Express.Multer.File, provider: string) {
    const workbook: IWorkBook = read(excel.buffer);
    const sheetNames = Object.keys(workbook.Sheets);
    const dataFromSheet = workbook.Sheets[sheetNames[0]];

    const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);

    return dataFromSheet;
  }
}
