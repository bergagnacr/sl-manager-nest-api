/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="multer" />
import { providerNameType, providerType, SaveDataToJsonType } from './types';
export declare const saveDataToJson: (provider: providerNameType, providerData: providerType) => Promise<SaveDataToJsonType>;
export declare const processProviderDataFromExcel: (provider: providerNameType, excel: Express.Multer.File) => Promise<providerType>;
