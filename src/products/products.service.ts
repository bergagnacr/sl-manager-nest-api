import { Injectable } from '@nestjs/common';
import {
  providerNameType,
  totalDataResponseType,
  productDataType,
} from './types';
import { processProviderDataFromExcel } from './helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  async getProductByProvider(provider: providerNameType) {
    return await this.productRepository.findOneBy({
      productProvider: provider,
    });
  }

  async findAll(): Promise<Products[]> {
    return await this.productRepository.find();
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
