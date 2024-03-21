import { TransactionType } from "@/components/transaction/transaction.type";

export type DetailsType = {
  name: string;
  total: string;
  current: string;
  percentage: number;
  transactions: TransactionType[];
};
