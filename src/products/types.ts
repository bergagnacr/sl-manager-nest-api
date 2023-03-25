export type providerNameType =
  | 'montenegro'
  | 'artec'
  | 'tolken'
  | 'newplenty'
  | 'easa';

export interface totalDataResponseType {
  fileName: string;
  providerName: string;
  data: productDataType[];
  error?: string;
}

// export interface totalDataParsedType {
//   fileName: string;
//   providerName: string;
//   data: parsedDataType[];
//   error?: string;
// }
export interface productDataType {
  productCode: string;
  productDescription: string | '';
  productPrice: number | null;
  productProvider: string;
}
