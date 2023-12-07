import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TitleAccount from "../ui/TitleAccount";
import React, { useState } from "react";
import AccountModal from "../ui/AccountModal";
import TransactionList from "../ui/TransactionList";
import { useFocusEffect } from "@react-navigation/native";
import { getTransactionsList } from "../ethereum/utils";
import { ETHERSCAN_API_KEY } from "@env";
const transactionCount = 100;

function Transactions() {
  const currentAccountAddress = useSelector(
    (state) => state.walletBT.currentAccountAddress
  );
  const currentAccountKey = useSelector(
    (state) => state.walletBT.currentAccountKey
  );
  const walletAccounts = useSelector((state) => state.walletBT.accounts);

  const [modalStatus, setModalStatus] = useState(false);
  const [transactionList, setTransactionsList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (currentAccountAddress) {
        getTransactionsList(
          currentAccountAddress,
          ETHERSCAN_API_KEY,
          transactionCount
        )
          .then((trnx) => setTransactionsList(trnx))
          .catch((e) => alert("Could not fetch the transactions list"));
      }
    }, [currentAccountAddress])
  );

  return (
    <View style={styles.rootContainer}>
      <AccountModal
        accounts={walletAccounts}
        visible={modalStatus}
        setModalStatus={setModalStatus}
      />
      <TitleAccount
        currentAccountAddress={currentAccountAddress}
        onPress={() => setModalStatus(true)}
      />
      <TransactionList
        transactionList={transactionList}
        transactionCount={transactionCount}
      />
    </View>
  );
}
export default Transactions;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
