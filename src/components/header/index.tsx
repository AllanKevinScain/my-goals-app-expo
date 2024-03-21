import { View, Text } from "react-native";
import { HeaderProps } from "./header.type";

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, subtitle } = props;

  return (
    <View className="mt-14 mb-12">
      <Text className="text-white font-bold text-4xl">{title}</Text>
      <Text className="text-white font-regular text-lg">{subtitle}</Text>
    </View>
  );
};
