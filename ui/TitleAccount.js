import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import truncateEthAddress from "truncate-eth-address";

function TitleAccount({ currentAccountAddress, onPress }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.accountNameIcon}>
        <Text style={styles.title}>Accounts</Text>
        <Ionicons
          name="chevron-down-circle-outline"
          size={24}
          color="#f6f4f4"
          onPress={onPress}
        />
      </View>
      <Text style={styles.address}>
        {currentAccountAddress
          ? truncateEthAddress(currentAccountAddress)
          : null}
      </Text>
    </View>
  );
}

export default TitleAccount;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#ff6720",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  accountNameIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    paddingRight: 10,
    fontWeight: "bold",
  },
  address: {
    textAlign: "center",
  },
});
