export interface providerDataType {
  provider: string;
  code: string | null;
  description: string | '';
  price: number | null;
}

export type providerType =
  | 'montenegro2'
  | 'montenegro3'
  | 'artec'
  | 'tolken'
  | 'newplenty'
  | 'easa';
