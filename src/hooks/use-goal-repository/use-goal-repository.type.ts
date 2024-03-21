export interface GoalCreateDatabaseProps {
  total: number;
  name: string;
}

export type GoalResponseType = {
  id: string;
  name: string;
  total: number;
  current: number;
};
