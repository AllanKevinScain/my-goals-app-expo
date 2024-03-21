export interface TransactionCreateProps {
  amount: number;
  goalId: number;
}

export type TransactionResponseType = {
  id: string;
  amount: number;
  goal_id: number;
  created_at: number;
};
