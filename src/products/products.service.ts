import { Injectable } from '@nestjs/common';
import { read, IWorkBook } from 'ts-xlsx';

@Injectable()
export class ProductsService {
  async readExcel(excel: Express.Multer.File, provider: string) {
    const workbook: IWorkBook = read(excel.buffer);
    const sheetNames = Object.keys(workbook.Sheets);
    const dataFromSheet = workbook.Sheets[sheetNames[0]];
    const cellNames = Object.keys(dataFromSheet);
    const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);

    console.log(cellNames[cellNames.length - 1]);
    const providerLength = (provider) => {
      if (provider === 'montenegro') {
        return ['A', 'B', 'C'];
      }
      return [];
    };
    const totalData = [];
    cellNames.forEach((item, index) => {
      if (item !== '!ref' && item !== '!margins' && index <= totalCell) {
        totalData.push({
          provider: provider,
          code: dataFromSheet[providerLength(provider)[0] + index]?.v.trim(),
          description: dataFromSheet[providerLength(provider)[1] + index]?.v,
          price: dataFromSheet[providerLength(provider)[2] + index]?.v,
        });
      }
    });

    return totalData;
  }
}
