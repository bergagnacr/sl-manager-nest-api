import { Injectable } from '@nestjs/common';
import {
  providerDataResponseType,
  providerNameType,
  SaveDataToJsonType,
} from './types';

import { processProviderDataFromExcel, saveDataToJson } from './helpers';

@Injectable()
export class ProductsService {
  async readExcel(
    excel: Express.Multer.File,
    provider: providerNameType,
  ): Promise<providerDataResponseType> {
    try {
      const data = await processProviderDataFromExcel(provider, excel);
      if (data) {
        const dataSaved: SaveDataToJsonType = await saveDataToJson(
          provider,
          data,
        );
        return {
          file: excel.filename,
          provider,
          message: `file for provider ${provider}, has been processed, filename: ${dataSaved.filename}`,
        };
      }
    } catch (e) {
      return {
        file: excel.filename,
        provider,
        message: `file for provider ${provider}, could not being uploaded`,
        error: e,
      };
    }
  }
}
