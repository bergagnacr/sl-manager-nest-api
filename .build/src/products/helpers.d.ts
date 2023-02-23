/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="multer" />
import { productDataType, providerNameType } from './types';
export declare const processProviderDataFromExcel: (provider: providerNameType, excel: Express.Multer.File) => Promise<productDataType[]>;
