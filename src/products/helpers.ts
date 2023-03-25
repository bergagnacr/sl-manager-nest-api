import { IWorkBook, IWorkSheet, read } from 'ts-xlsx';
import {
  productDataType,
  providerNameType,
  totalDataResponseType,
} from './types';
import { providersRows } from './config';

const evaluateProvider = (provider): providerNameType => {
  return provider.includes('2') || provider.includes('3')
    ? provider.substring(provider.length - 1, -1)
    : provider;
};

const evaluateValue = (value): string | null => {
  return !value ? null : value;
};
const validateObject = (
  code: string,
  description: string,
  price: string,
  providerName: providerNameType,
): productDataType | null => {
  if (!code) return;
  const sanitizedCode = code.trim().toString();
  if (sanitizedCode && price) {
    const sanitizedDescription = description.replace(' ', '');
    const sanitizedPrice = price ? Number(price) : 0;
    return {
      productCode: sanitizedCode,
      productDescription: sanitizedDescription,
      productPrice: sanitizedPrice,
      productProvider: providerName,
    };
  } else {
    return;
  }
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
  let validatedObject;
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
        dataFromSheet[`${providersRows[provider].rows[2] + index}`]?.v,
      );
      validatedObject = validateObject(code, description, price, providerName);
      totalData.data.push(validatedObject);
    } else {
      return { provider: providerName, data: [{}] };
    }
  });
  return totalData.data;
};
