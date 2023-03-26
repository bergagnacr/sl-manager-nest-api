/// <reference types="multer" />
import { providerNameType, totalDataResponseType } from './types';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Products>);
    getProductByProvider(provider: providerNameType): Promise<Products>;
    findAll(): Promise<Products[]>;
    uploadListToDataBase(excel: Express.Multer.File, provider: providerNameType): Promise<totalDataResponseType>;
}
