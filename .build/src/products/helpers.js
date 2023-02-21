"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProviderDataFromExcel = exports.saveDataToJson = void 0;
const ts_xlsx_1 = require("ts-xlsx");
const config_1 = require("./config");
const fs_1 = require("fs");
const evaluateProvider = (provider) => {
    return provider.includes('2') || provider.includes('3')
        ? provider.substring(provider.length - 1, -1)
        : provider;
};
const evaluateValue = (value) => {
    return !value ? null : value;
};
const saveDataToJson = async (provider, providerData) => {
    const fileName = `src/data/${provider}.json`;
    try {
        (0, fs_1.writeFile)(fileName, JSON.stringify(providerData), (error) => {
            if (error) {
                console.log('error ocurred writting file', error);
                return;
            }
            console.log('data written successfully');
        });
    }
    catch (error) {
        console.error(error);
    }
    return { provider: evaluateProvider(provider), filename: fileName };
};
exports.saveDataToJson = saveDataToJson;
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
    const totalData = { provider: providerName, data: [] };
    cellNames.forEach((item, index) => {
        var _a, _b, _c;
        if (item !== '!ref' &&
            item !== '!margins' &&
            index >= config_1.providersRows[provider].initialRow &&
            index <= totalCell) {
            const code = evaluateValue((_a = dataFromSheet[`${config_1.providersRows[provider].rows[provider === 'artec' ? 1 : 0] + index}`]) === null || _a === void 0 ? void 0 : _a.v.toString());
            const description = evaluateValue((_b = dataFromSheet[`${config_1.providersRows[provider].rows[provider === 'artec' ? 0 : 1] + index}`]) === null || _b === void 0 ? void 0 : _b.v.toString());
            const price = evaluateValue(Number((_c = dataFromSheet[`${config_1.providersRows[provider].rows[2] + index}`]) === null || _c === void 0 ? void 0 : _c.v).toFixed(2));
            totalData.data.push({
                code: code,
                description: description,
                price: price,
            });
        }
        else {
            return { provider: providerName, data: [{}] };
        }
    });
    return totalData;
};
exports.processProviderDataFromExcel = processProviderDataFromExcel;
//# sourceMappingURL=helpers.js.map