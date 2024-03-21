import { ColorValue, PressableProps } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type TransactionItemType = {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: ColorValue;
  selected: boolean;
};

export interface TransactionItemProps extends PressableProps {
  type: TransactionItemType;
}

type SelectedType = "up" | "down";

export interface TransactionSelectProps {
  selected: SelectedType;
  onChange: (type: SelectedType) => void;
}
