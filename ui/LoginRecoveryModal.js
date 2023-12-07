import { Modal, StyleSheet, TextInput, View, Text } from "react-native";
import PrimaryButton from "./PrimaryButton";

function LoginRecoveryModal({
  visible,
  setModalStatus,
  setMnemonicPhrase,
  setAccountStatus,
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setModalStatus(false)}
      animationType="slide"
    >
      <View style={styles.rootContainer}>
        <Text style={styles.label}>Enter the Mnemonic Phrase</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Enter the mnemonic phrase"
          onChangeText={(enteredMnemonic) => setMnemonicPhrase(enteredMnemonic)}
          keyboardType="ascii-capable"
        />
        <PrimaryButton
          onPress={() => {
            setAccountStatus(true);
            setModalStatus(false);
          }}
        >
          Recover Wallet
        </PrimaryButton>
      </View>
    </Modal>
  );
}

export default LoginRecoveryModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 5,
  },
  input: {
    backgroundColor: "#c4ccd4",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
