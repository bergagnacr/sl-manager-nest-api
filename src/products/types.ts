export type providerNameType =
  | 'montenegro2'
  | 'montenegro3'
  | 'artec'
  | 'tolken'
  | 'newplenty'
  | 'easa';

export interface totalDataResponseType {
  fileName: string;
  providerName: string;
  // data: productDataType[];
  data: any;
  error?: string;
}

// export interface totalDataParsedType {
//   fileName: string;
//   providerName: string;
//   data: parsedDataType[];
//   error?: string;
// }
export interface productDataType {
  itemCode: string;
  itemDescription: string | '';
  itemPrice: number | null;
  itemProvider: string;
}
