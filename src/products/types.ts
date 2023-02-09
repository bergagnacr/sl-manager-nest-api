export interface providerDataType {
  item: string | null;
  description: string | '';
  value: number | null;
}

export interface providerDataListType {
  provider: string;
  providerData: providerDataType;
}

export interface ObjectDataType {
  provider: string;
  sheet: object;
  range: string;
  data: providerDataType;
}

export interface processedExcelDataType {
  data: providerDataType[];
}

export interface codeCellType {
  t: string;
  v: string;
  r: string;
  h: string;
  w: string;
}
