/// <reference types="multer" />
import { providerNameType, totalDataResponseType } from './types';
import * as AWS from 'aws-sdk';
export declare class ProductsService {
    private readonly PRODUCTS_TABLE_NAME;
    private readonly REGION;
    private readonly STAGE;
    private readonly CONFIG;
    private readonly dynamoDb;
    getProductByProvider(provider: string): Promise<AWS.DynamoDB.DocumentClient.ItemList>;
    readExcel(excel: Express.Multer.File, provider: providerNameType): Promise<totalDataResponseType>;
}
