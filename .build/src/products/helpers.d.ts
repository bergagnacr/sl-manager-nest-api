/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
/// <reference types="passport" />
import { providerNameType, providerType, SaveDataToJsonType } from './types';
export declare const saveDataToJson: (provider: providerNameType, providerData: providerType) => Promise<SaveDataToJsonType>;
export declare const processProviderDataFromExcel: (provider: providerNameType, excel: Express.Multer.File) => Promise<providerType>;
