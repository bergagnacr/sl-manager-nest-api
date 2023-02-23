"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const AWS = __importStar(require("aws-sdk"));
let ProductsService = class ProductsService {
    constructor() {
        this.PRODUCTS_TABLE_NAME = process.env.DB_TABLE;
        this.REGION = process.env.REGION;
        this.STAGE = process.env.STAGE;
        this.CONFIG = this.STAGE === 'local'
            ? {
                region: 'us-east-1',
                endpoint: process.env.DYNAMODB_ENDPOINT_LOCAL,
            }
            : {
                region: this.REGION,
            };
        this.dynamoDb = new AWS.DynamoDB.DocumentClient(this.CONFIG);
    }
    async getProductByProvider(provider) {
        const queryParams = {
            TableName: this.PRODUCTS_TABLE_NAME,
            ScanIndexForward: true,
            KeyConditionExpression: '#globalSecondaryIndex = :provider And attribute_exists(#partitionKey)',
            ExpressionAttributeValues: {
                ':provider': provider,
            },
            ExpressionAttributeNames: {
                '#globalSecondaryIndex': 'provider-index',
                '#partitionKey': 'itemCode',
            },
        };
        const result = await this.dynamoDb.query(queryParams).promise();
        const items = result.Items;
        return items;
    }
    async readExcel(excel, provider) {
        try {
            const totalData = await (0, helpers_1.processProviderDataFromExcel)(provider, excel);
            if (totalData) {
                const dataUpdated = totalData.map(async (item) => {
                    const queryParams = {
                        TableName: this.PRODUCTS_TABLE_NAME,
                        Key: { '#partitionKey': 'itemId' },
                        ExpressionAttributeNames: {
                            '#partitionKey': 'itemCode',
                        },
                        ExpressionAttributeValues: {
                            ':itemCode': item.itemCode,
                        },
                        KeyConditionExpression: '#partitionKey = :itemCode',
                    };
                    const results = await this.dynamoDb
                        .query(queryParams)
                        .promise()
                        .catch((error) => {
                        console.error(error);
                    });
                    if (!results) {
                        const queryParams = {
                            TableName: this.PRODUCTS_TABLE_NAME,
                            ExpressionAttributeNames: {
                                '#partitionKey': 'itemId',
                            },
                            ExpressionAttributeValues: {
                                ':itemCode': item.itemCode,
                            },
                            Item: {
                                item,
                            },
                        };
                        await this.dynamoDb
                            .put(queryParams)
                            .promise()
                            .catch((error) => {
                            console.error(error);
                        });
                    }
                    else {
                        const queryParams = {
                            TableName: this.PRODUCTS_TABLE_NAME,
                            Key: { '#partitionKey': 'itemId' },
                            Item: item,
                            ExpressionAttributeValues: {
                                ':itemCode': { S: item.itemCode },
                            },
                            ConditionExpression: 'itemCode = :itemCode',
                        };
                        return await this.dynamoDb
                            .update(queryParams)
                            .promise()
                            .catch((error) => {
                            console.error(error);
                        });
                    }
                });
                return {
                    fileName: excel.filename,
                    providerName: provider,
                    data: dataUpdated,
                };
            }
        }
        catch (e) {
            console.error(e);
            return {
                fileName: excel.filename,
                providerName: provider,
                data: undefined,
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