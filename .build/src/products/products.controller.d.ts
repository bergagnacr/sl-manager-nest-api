/// <reference types="multer" />
import { ProductsService } from './products.service';
import { providerNameType } from './types';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getProducts(): string;
    uploadExcelFile(file: Express.Multer.File, provider: providerNameType): Promise<import("./types").providerDataResponseType>;
}
