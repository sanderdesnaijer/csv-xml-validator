export interface Record {
  id: string;
  accountNumber: string;
  description: string;
  endBalance: string;
  mutation: string;
  reference: string;
  startBalance: string;
  errors?: [string];
}

export interface Records extends Array<Record> {}

export type Filter = "valid" | "invalid" | "all";
