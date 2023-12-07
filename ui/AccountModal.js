import { FlatList, Modal, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import {
  setCurrentAccountAddress,
  setCurrentAccountKey,
} from "../store/walletBTSlice";

function AccountModal({ visible, setModalStatus, accounts }) {
  const dispatch = useDispatch();
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setModalStatus(false)}
      animationType="slide"
    >
      <FlatList
        ListHeaderComponent={() => (
          <Text style={styles.header}>Select the Account</Text>
        )}
        data={accounts}
        renderItem={({ item }) => (
          <Text
            style={styles.account}
            onPress={() => {
              dispatch(setCurrentAccountAddress(item.account));
              dispatch(setCurrentAccountKey(item.key));
              setModalStatus(false);
            }}
          >
            {item.account}
          </Text>
        )}
        keyExtractor={(item) => item.account}
        ListFooterComponent={() => (
          <Text style={styles.footer}>Click on the address to select it</Text>
        )}
      />
    </Modal>
  );
}

export default AccountModal;

const styles = StyleSheet.create({
  account: {
    paddingVertical: 10,
    textAlign: "center",
    marginVertical: 5,
    backgroundColor: "#ff6720",
    marginHorizontal: 5,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 16,
  },
});
