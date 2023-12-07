import { Pressable, Text, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f3d22d",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});
