/// <reference types="multer" />
import { ProductsService } from './products.service';
import { providerNameType, totalDataResponseType } from './types';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getProducts(): string;
    getProductsByProvider(provider: providerNameType): Promise<import("./products.entity").Products>;
    insertProductsIntoDynamo(file: Express.Multer.File, provider: providerNameType): Promise<totalDataResponseType>;
}
