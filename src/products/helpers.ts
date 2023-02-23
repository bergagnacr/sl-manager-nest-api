import { IWorkBook, IWorkSheet, read } from 'ts-xlsx';
import {
  productDataType,
  providerNameType,
  totalDataResponseType,
} from './types';
import { providersRows } from './config';
import { v4 as uuidV4 } from 'uuid';

const evaluateProvider = (provider): providerNameType => {
  return provider.includes('2') || provider.includes('3')
    ? provider.substring(provider.length - 1, -1)
    : provider;
};

const evaluateValue = (value): any | null => {
  return !value ? null : value;
};

export const processProviderDataFromExcel = async (
  provider: providerNameType,
  excel: Express.Multer.File,
): Promise<productDataType[]> => {
  let cellNames: string[];
  let dataFromSheet: IWorkSheet;
  try {
    const workbook: IWorkBook = read(excel.buffer);
    const sheetNames = Object.keys(workbook.Sheets);
    dataFromSheet = workbook.Sheets[sheetNames[0]];
    cellNames = Object.keys(dataFromSheet);
  } catch (error) {
    console.error(error);
  }
  const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);

  const providerName: providerNameType = evaluateProvider(provider);
  const totalData: totalDataResponseType = {
    fileName: excel.originalname,
    providerName: provider,
    data: [],
  };
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
        itemCode: code.trim().toString(),
        itemDescription: description,
        itemPrice: price,
        itemProvider: providerName,
      });
    } else {
      return { provider: providerName, data: [{}] };
    }
  });
  return totalData.data;
};
