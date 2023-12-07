import { FlatList, StyleSheet, Text, View } from "react-native";
import truncateEthAddress from "truncate-eth-address";
import { ethers } from "ethers";

function TransactionList({ transactionList, transactionCount }) {
  return (
    <View style={styles.rootContainer}>
      {transactionList.length > 0 ? (
        <FlatList
          ListHeaderComponent={() => (
            <Text style={styles.title}>
              Last {transactionCount} Transactions
            </Text>
          )}
          data={transactionList}
          renderItem={({ item }) => (
            <Text style={styles.tnxDetails}>
              From:{truncateEthAddress(item.from)} To:
              {truncateEthAddress(item.to)} Amount:
              {parseFloat(ethers.utils.formatEther(item.value)).toFixed(7)} Fee:
              {parseFloat(
                ethers.utils.formatEther(item.gas * item.gasPrice)
              ).toFixed(7)}
            </Text>
          )}
          keyExtractor={(item) => item.hash}
        />
      ) : (
        <Text style={styles.noTransactionLabel}>
          No transactions available for this account
        </Text>
      )}
    </View>
  );
}

export default TransactionList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 10,
  },
  noTransactionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  tnxDetails: {
    textAlign: "center",
    backgroundColor: "#ffcd00",
    margin: 5,
    paddingVertical: 5,
  },
});
