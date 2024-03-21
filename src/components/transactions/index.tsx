import { FlatList, Text, View } from "react-native";
import { TransactionsProps } from "./transactions.type";
import { Item } from "./item";

export const Transactions: React.FC<TransactionsProps> = (props) => {
  const { transactions } = props;

  return (
    <View className="flex-1 mt-10">
      <Text className="text-white font-semiBold text-base border-b border-b-gray-400 pb-3">
        Últimas transações
      </Text>

      <FlatList
        data={transactions}
        renderItem={({ item }) => <Item transaction={item} />}
        contentContainerClassName="py-6 gap-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className="text-gray-300 font-regular text-sm">
            Nenhuma transação registrada ainda.
          </Text>
        )}
      />
    </View>
  );
};
