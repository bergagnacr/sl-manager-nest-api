"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProviderDataFromExcel = void 0;
const ts_xlsx_1 = require("ts-xlsx");
const config_1 = require("./config");
const evaluateProvider = (provider) => {
    return provider.includes('2') || provider.includes('3')
        ? provider.substring(provider.length - 1, -1)
        : provider;
};
const evaluateValue = (value) => {
    return !value ? null : value;
};
const validateObject = (code, description, price, providerName) => {
    if (!code)
        return;
    const sanitizedCode = code.trim().toString();
    if (sanitizedCode && price) {
        const sanitizedDescription = description.replace(' ', '');
        const sanitizedPrice = price ? Number(price) : 0;
        return {
            productCode: sanitizedCode,
            productDescription: sanitizedDescription,
            productPrice: sanitizedPrice,
            productProvider: providerName,
        };
    }
    else {
        return;
    }
};
const processProviderDataFromExcel = async (provider, excel) => {
    let cellNames;
    let dataFromSheet;
    try {
        const workbook = (0, ts_xlsx_1.read)(excel.buffer);
        const sheetNames = Object.keys(workbook.Sheets);
        dataFromSheet = workbook.Sheets[sheetNames[0]];
        cellNames = Object.keys(dataFromSheet);
    }
    catch (error) {
        console.error(error);
    }
    const totalCell = dataFromSheet['!ref'].split(':')[1].substring(1);
    const providerName = evaluateProvider(provider);
    const totalData = {
        fileName: excel.originalname,
        providerName: provider,
        data: [],
    };
    let validatedObject;
    cellNames.forEach((item, index) => {
        var _a, _b, _c;
        if (item !== '!ref' &&
            item !== '!margins' &&
            index >= config_1.providersRows[provider].initialRow &&
            index <= totalCell) {
            const code = evaluateValue((_a = dataFromSheet[`${config_1.providersRows[provider].rows[provider === 'artec' ? 1 : 0] + index}`]) === null || _a === void 0 ? void 0 : _a.v.toString());
            const description = evaluateValue((_b = dataFromSheet[`${config_1.providersRows[provider].rows[provider === 'artec' ? 0 : 1] + index}`]) === null || _b === void 0 ? void 0 : _b.v.toString());
            const price = evaluateValue((_c = dataFromSheet[`${config_1.providersRows[provider].rows[2] + index}`]) === null || _c === void 0 ? void 0 : _c.v);
            validatedObject = validateObject(code, description, price, providerName);
            totalData.data.push(validatedObject);
        }
        else {
            return { provider: providerName, data: [{}] };
        }
    });
    return totalData.data;
};
exports.processProviderDataFromExcel = processProviderDataFromExcel;
//# sourceMappingURL=helpers.js.map