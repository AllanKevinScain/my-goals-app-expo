import { TouchableOpacityProps } from "react-native";

export type GoalType = {
  name: string;
  current: number;
  total: number;
};

export interface GoalProps extends TouchableOpacityProps {
  goal: GoalType;
}
