import { Injectable, NotFoundException } from '@nestjs/common';
import {
  providerNameType,
  totalDataResponseType,
  productDataType,
} from './types';
import { processProviderDataFromExcel } from './helpers';

@Injectable()
export class ProductsService {
  async getProductByProvider(provider: string) {
    return provider;
  }

  async uploadListToDataBase(
    excel: Express.Multer.File,
    provider: providerNameType,
  ): Promise<totalDataResponseType> {
    try {
      const totalData: productDataType[] = await processProviderDataFromExcel(
        provider,
        excel,
      );
      return {
        fileName: excel.filename,
        providerName: provider,
        data: totalData,
      };
    } catch (e) {
      console.error(e);
      return {
        fileName: excel.filename,
        providerName: provider,
        data: undefined,
        error: e,
      };
    }
  }
}
