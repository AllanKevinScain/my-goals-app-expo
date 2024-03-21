import { Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.type";

export const Button: React.FC<ButtonProps> = (props) => {
  const { title, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-12 w-full bg-blue-500 items-center justify-center rounded-sm"
      {...rest}
    >
      <Text className="text-white text-sm font-semiBold uppercase">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
