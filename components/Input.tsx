import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type Props = TextInputProps & {};

export default function Input({ ...rest }: Props) {
  return (
    <TextInput
      mode="outlined"
      style={styles.input}
      outlineStyle={styles.outlineStyle}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.neutral.background,
    borderColor: Colors.neutral.border,
    borderRadius: 6,
  },
  outlineStyle: {
    borderColor: Colors.neutral.border,
    outline: Colors.neutral.border,
  },
});
