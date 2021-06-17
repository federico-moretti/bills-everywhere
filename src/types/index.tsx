export type Transaction = {
  id: number;
  amount: number;
  date: string;
};

export type Merchant = {
  id: string;
  transactions: Transaction[];
  categoryId: number;
  iconUrl: string;
  isBill: boolean;
  name: string;
};
