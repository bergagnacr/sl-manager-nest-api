import { IWorkBook, read } from 'ts-xlsx';
import { providerNameType, providerType, SaveDataToJsonType } from './types';
import { providersRows } from './config';
import { writeFile } from 'fs';

const evaluateProvider = (provider): providerNameType => {
  return provider.includes('2') || provider.includes('3')
    ? provider.substring(provider.length - 1, -1)
    : provider;
};

const evaluateValue = (value): any | null => {
  return !value ? null : value;
};

export const saveDataToJson = async (
  provider: providerNameType,
  providerData: providerType,
): Promise<SaveDataToJsonType> => {
  const fileName = `src/data/${provider}-${Date.now()}.json`;
  writeFile(fileName, JSON.stringify(providerData), (error) => {
    if (error) {
      console.log('error ocurred writting file', error);
      return;
    }
    console.log('data written successfully');
  });
  return { provider: evaluateProvider(provider), filename: fileName };
};

export const processProviderDataFromExcel = async (
  provider: providerNameType,
  excel: Express.Multer.File,
): Promise<providerType> => {
  const workbook: IWorkBook = read(excel.buffer);
  const sheetNames = Object.keys(workbook.Sheets);
  const dataFromSheet = workbook.Sheets[sheetNames[0]];
  const cellNames = Object.keys(dataFromSheet);
  const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);

  const providerName: providerNameType = evaluateProvider(provider);
  const totalData: providerType = { provider: providerName, data: [] };
  cellNames.forEach((item, index) => {
    if (
      item !== '!ref' &&
      item !== '!margins' &&
      index >= providersRows[provider].initialRow &&
      index <= totalCell
    ) {
      const code = evaluateValue(
        dataFromSheet[
          `${
            providersRows[provider].rows[provider === 'artec' ? 1 : 0] + index
          }`
        ]?.v.toString(),
      );
      const description = evaluateValue(
        dataFromSheet[
          `${
            providersRows[provider].rows[provider === 'artec' ? 0 : 1] + index
          }`
        ]?.v.toString(),
      );
      const price = evaluateValue(
        Number(
          dataFromSheet[`${providersRows[provider].rows[2] + index}`]?.v,
        ).toFixed(2),
      );
      totalData.data.push({
        code: code,
        description: description,
        price: price,
      });
    } else {
      return { provider: providerName, data: [{}] };
    }
  });
  return totalData;
};
