import { Injectable } from '@nestjs/common';
import { read, IWorkBook } from 'ts-xlsx';
import { providerDataType } from './types';
import { providersRows } from './config';

@Injectable()
export class ProductsService {
  async readExcelAndReturnObject(
    excel: Express.Multer.File,
    provider: string,
  ): Promise<providerDataType[]> {
    const workbook: IWorkBook = read(excel.buffer);
    const sheetNames = Object.keys(workbook.Sheets);
    const dataFromSheet = workbook.Sheets[sheetNames[0]];
    const cellNames = Object.keys(dataFromSheet);
    const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);

    const totalData: providerDataType[] = [];

    const evaluateProvider = (provider) => {
      return provider.includes('2') || provider.includes('3')
        ? provider.substring(provider.length - 1, -1)
        : provider;
    };

    const evaluateValue = (value) => {
      return !value ? null : value;
    };

    cellNames.forEach((item, index) => {
      if (
        item !== '!ref' &&
        item !== '!margins' &&
        index >= providersRows[provider].initialRow &&
        index <= totalCell
      ) {
        const code = evaluateValue(
          dataFromSheet[`${providersRows[provider].rows[0] + index}`]?.v,
        );
        const description = evaluateValue(
          dataFromSheet[`${providersRows[provider].rows[1] + index}`]?.v,
        );
        const price = evaluateValue(
          dataFromSheet[`${providersRows[provider].rows[2] + index}`]?.v,
        );

        code &&
          price &&
          totalData.push({
            provider: evaluateProvider(provider),
            code: code,
            description,
            price,
          });
      }
    });

    return totalData;
  }
}
