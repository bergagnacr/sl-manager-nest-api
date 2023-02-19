/// <reference types="multer" />
import { providerDataResponseType, providerNameType } from './types';
export declare class ProductsService {
    readExcel(excel: Express.Multer.File, provider: providerNameType): Promise<providerDataResponseType>;
}
