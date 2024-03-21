import { TouchableOpacityProps } from "react-native";

export type GoalType = {
  name: string;
  current: number;
  total: number;
};

export interface GoalProps extends TouchableOpacityProps {
  goal: GoalType;
}

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
