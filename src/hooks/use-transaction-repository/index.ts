import { useSQLiteContext } from "expo-sqlite/next";
import {
  TransactionCreateProps,
  TransactionResponseType,
} from "./use-transaction-repository.type";

export function useTransactionRepository() {
  const db = useSQLiteContext();

  function findLatest() {
    try {
      return db.getAllSync<TransactionResponseType>(`
        SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10
      `);
    } catch (error) {
      throw error;
    }
  }

  function findByGoaldId(goalId: number) {
    try {
      const statement = db.prepareSync(`
      SELECT * FROM transactions WHERE goal_id = $goal_id
    `);
      const res = statement.executeSync<TransactionResponseType>({
        $goal_id: goalId,
      });

      return res.getAllSync();
    } catch (error) {
      throw error;
    }
  }

  function create(transaction: TransactionCreateProps) {
    try {
      const statement = db.prepareSync(`
        INSERT INTO transactions (amount, goal_id) VALUES ($amount, $goal_id)
      `);

      statement.executeSync({
        $amount: transaction.amount,
        $goal_id: transaction.goalId,
      });
    } catch (error) {
      throw error;
    }
  }

  return {
    findLatest,
    findByGoaldId,
    create,
  };
}
