import { ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { colors } from "@/styles";
import { GoalsProps } from "./goals.type";
import { Item } from "./item";

export const Goals: React.FC<GoalsProps> = (props) => {
  const { goals, onAdd, onPress } = props;

  return (
    <ScrollView
      horizontal
      contentContainerClassName="gap-4"
      showsHorizontalScrollIndicator={false}
      className="w-full max-h-44"
    >
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-green-500 w-16 max-h-44 items-center justify-center rounded-lg"
        onPress={onAdd}
      >
        <MaterialIcons name="add" size={36} color={colors.black} />
      </TouchableOpacity>

      {goals.map(({ id, name, current, total }) => (
        <Item
          key={id}
          goal={{ name, current, total }}
          onPress={() => onPress(id)}
        />
      ))}
    </ScrollView>
  );
};
