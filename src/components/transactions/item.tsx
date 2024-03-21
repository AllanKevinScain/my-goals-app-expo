import { Pressable, Text } from "react-native";

import { currencyFormat } from "@/utils";
import { colors } from "@/styles";
import { TransactionProps } from "./transactions.type";

export const Item: React.FC<TransactionProps> = (props) => {
  const { transaction, ...rest } = props;

  return (
    <Pressable
      className="w-full h-16 bg-gray-500 rounded-sm border border-gray-400 p-4 flex-row items-center justify-between"
      {...rest}
    >
      <Text
        className="font-regular text-sm"
        style={{
          color: transaction.amount < 0 ? colors.red[500] : colors.green[500],
        }}
      >
        {transaction.amount < 0 ? "- " : "+ "}
        {currencyFormat(transaction.amount).replace("-", "")}
      </Text>

      <Text className="text-gray-300 font-regular text-sm">
        {transaction.date}
      </Text>
    </Pressable>
  );
};
