import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function AccountDetails({ currentAccountAddress, currentAccountKey, balance }) {
  return (
    <LinearGradient
      colors={["#ffcd00", "#ff6720"]}
      style={styles.accountDetails}
    >
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.label}>Address:</Text>
      <Text selectable={true}>{currentAccountAddress}</Text>
      <Text style={styles.label}>Balance(Eth):</Text>
      <Text>{balance ? parseFloat(balance).toFixed(10) : 0.0}</Text>
      <Text style={styles.label}>Private Key:</Text>
      <Text selectable={true}>{currentAccountKey}</Text>
    </LinearGradient>
  );
}

export default AccountDetails;

const styles = StyleSheet.create({
  accountDetails: {
    marginTop: 15,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
