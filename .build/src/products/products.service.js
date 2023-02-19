"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
let ProductsService = class ProductsService {
    async readExcel(excel, provider) {
        try {
            const data = await (0, helpers_1.processProviderDataFromExcel)(provider, excel);
            if (data) {
                const dataSaved = await (0, helpers_1.saveDataToJson)(provider, data);
                return {
                    file: excel.filename,
                    provider,
                    message: `file for provider ${provider}, has been processed, filename: ${dataSaved.filename}`,
                };
            }
        }
        catch (e) {
            return {
                file: excel.filename,
                provider,
                message: `file for provider ${provider}, could not being uploaded`,
                error: e,
            };
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map