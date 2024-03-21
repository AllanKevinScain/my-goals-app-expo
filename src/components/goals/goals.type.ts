export type GoalsType = {
  id: string;
  name: string;
  current: number;
  total: number;
};

export interface GoalsProps {
  goals: GoalsType[];
  onPress: (id: string) => void;
  onAdd: () => void;
}
