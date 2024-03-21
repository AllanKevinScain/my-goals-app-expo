import { Text, View, TouchableOpacity } from "react-native";

import { currencyFormat } from "@/utils";
import { GoalProps } from "./goals.type";

export const Item: React.FC<GoalProps> = (props) => {
  const { goal, onDeleteGoal, ...rest } = props;
  const percentage = (goal.current / goal.total) * 100;
  const width = percentage > 100 ? 100 : percentage;
  const value = percentage.toFixed(0) + "%";

  return (
    <TouchableOpacity
      className="w-40 bg-gray-500 rounded-lg p-4"
      activeOpacity={0.7}
      {...rest}
    >
      <Text className="text-white font-bold text-lg mb-3">{goal.name}</Text>

      <Text className="text-white font-semiBold text-sm">
        {currencyFormat(goal.current)}
      </Text>

      <Text className="text-gray-300 font-regular text-sm flex-1">
        {currencyFormat(goal.total)}
      </Text>

      <View className="w-full h-7 rounded-full bg-gray-400 overflow-hidden flex-row items-center">
        <View
          className="h-7 items-end justify-center rounded-full bg-green-500"
          style={{ width: `${width}%` }}
        >
          {percentage >= 60 && (
            <Text className="text-black text-xs font-semiBold mx-5">
              {value}
            </Text>
          )}
        </View>

        {percentage < 60 && (
          <Text className="text-white text-xs font-semiBold mx-5">{value}</Text>
        )}
      </View>

      <TouchableOpacity
        className="flex flex-row justify-center bg-red-500 rounded-lg mt-2 p-2"
        onPress={onDeleteGoal}
      >
        <Text>Excluir Meta</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
