export type providerNameType = 'montenegro2' | 'montenegro3' | 'artec' | 'tolken' | 'newplenty' | 'easa';
export interface providerType {
    provider: providerNameType;
    data: providerDataType[];
}
export interface providerDataType {
    code: string | null;
    description: string | '';
    price: number | null;
}
export interface providerDataResponseType {
    file: string;
    provider: string;
    message: string;
    error?: string;
}
export interface SaveDataToJsonType {
    provider: string;
    filename: string;
}
