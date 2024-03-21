import { useSQLiteContext } from "expo-sqlite/next";
import {
  GoalCreateDatabaseProps,
  GoalResponseType,
} from "./use-goal-repository.type";

export function useGoalRepository() {
  const db = useSQLiteContext();

  function create(goal: GoalCreateDatabaseProps) {
    try {
      const statement = db.prepareSync(
        `INSERT INTO goals (name, total) VALUES ($name, $total)`
      );

      statement.executeSync({ $name: goal.name, $total: goal.total });
    } catch (error) {
      throw error;
    }
  }
  function listAll() {
    try {
      return db.getAllSync<GoalResponseType>(`
      SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current
      FROM goals AS g
      LEFT JOIN transactions t ON t.goal_id = g.id
      GROUP BY g.id, g.name, g.total;
      `);
    } catch (error) {
      throw error;
    }
  }
  function get(id: number) {
    try {
      const statement = db.prepareSync(`
      SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current
      FROM goals AS g
      LEFT JOIN transactions t ON t.goal_id = g.id
      WHERE g.id = $id
      GROUP BY g.id, g.name, g.total;
    `);

      const res = statement.executeSync<GoalResponseType>({ $id: id });

      return res.getFirstSync();
    } catch (error) {
      throw error;
    }
  }
  function deleteGoalById(id: number) {
    try {
      const statement = db.prepareSync(`DELETE FROM goals WHERE id = $id`);

      statement.executeSync({ $id: id });
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    listAll,
    get,
    deleteGoalById,
  };
}
