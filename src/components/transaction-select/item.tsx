import { Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TransactionItemProps } from "./transaction-select.type";

export const TransactionItem: React.FC<TransactionItemProps> = (props) => {
  const { type, ...rest } = props;

  return (
    <Pressable
      className="px-4 py-2 bg-gray-400 rounded-sm flex-row items-center gap-2"
      style={{ opacity: type.selected ? 1 : 0.5 }}
      {...rest}
    >
      <MaterialIcons name={type.icon} color={type.color} size={16} />
      <Text className="text-white font-semiBold text-sm">{type.title}</Text>
    </Pressable>
  );
};
