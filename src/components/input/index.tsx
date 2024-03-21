import { TextInput, TextInputProps } from "react-native";

import { colors } from "@/styles";

export const Input: React.FC<TextInputProps> = (props) => {
  const { ...rest } = props;

  return (
    <TextInput
      placeholderTextColor={colors.gray[300]}
      className="w-full h-14 border border-gray-400 rounded p-4 text-white font-regular text-base"
      {...rest}
    />
  );
};
