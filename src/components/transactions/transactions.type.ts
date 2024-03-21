import { PressableProps } from "react-native";

export type TransactionType = {
  date: string;
  amount: number;
};

export interface TransactionProps extends PressableProps {
  transaction: TransactionType;
}

export interface TransactionsProps {
  transactions: TransactionType[];
}
