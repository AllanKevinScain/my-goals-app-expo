import { View } from "react-native";

import { colors } from "@/styles";
import { TransactionItem } from "./item";
import { TransactionSelectProps } from "./transaction-select.type";

export const TransactionSelect: React.FC<TransactionSelectProps> = (props) => {
  const { selected, onChange } = props;

  return (
    <View className="flex-row gap-4">
      <TransactionItem
        type={{
          icon: "add",
          title: "Depósito",
          color: colors.green[500],
          selected: selected === "up",
        }}
        onPress={() => onChange("up")}
      />

      <TransactionItem
        type={{
          icon: "remove",
          title: "Saque",
          color: colors.red[500],
          selected: selected === "down",
        }}
        onPress={() => onChange("down")}
      />
    </View>
  );
};
