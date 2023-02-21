import { Injectable } from '@nestjs/common';
import { providerDataResponseType, providerNameType } from './types';

import { processProviderDataFromExcel } from './helpers';

@Injectable()
export class ProductsService {
  async readExcel(
    excel: Express.Multer.File,
    provider: providerNameType,
  ): Promise<providerDataResponseType> {
    try {
      const data = await processProviderDataFromExcel(provider, excel);
      if (data) {
        return {
          file: excel.filename,
          provider,
          data,
        };
      }
    } catch (e) {
      return {
        file: excel.filename,
        provider,
        data: { provider, data: undefined },
        error: e,
      };
    }
  }
}
