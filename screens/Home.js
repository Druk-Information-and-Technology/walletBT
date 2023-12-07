import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TitleAccount from "../ui/TitleAccount";
import { getTransactionsList, getBalance } from "../ethereum/utils";
import { ETHERSCAN_API_KEY, INFURA_SEPOLIA_API } from "@env";
import AccountDetails from "../ui/AccountDetails";
import AccountModal from "../ui/AccountModal";
import TransactionList from "../ui/TransactionList";
const transactionCount = 10;

function Home() {
  const currentAccountAddress = useSelector(
    (state) => state.walletBT.currentAccountAddress
  );
  const currentAccountKey = useSelector(
    (state) => state.walletBT.currentAccountKey
  );
  const walletAccounts = useSelector((state) => state.walletBT.accounts);
  const [transactionsList, setTransactionsList] = useState([]);
  const [balance, setBalance] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (currentAccountAddress) {
        getTransactionsList(
          currentAccountAddress,
          ETHERSCAN_API_KEY,
          transactionCount
        )
          .then((tnx) => setTransactionsList(tnx))
          .catch((e) => alert("Could not fetch the transactions list"));

        getBalance(currentAccountAddress, INFURA_SEPOLIA_API)
          .then((balance) => {
            setBalance(balance);
          })
          .catch((e) => alert("Could not fetch balance"));
      }
    }, [currentAccountAddress])
  );
  return (
    <View style={styles.rootContainer}>
      <AccountModal
        visible={modalStatus}
        setModalStatus={setModalStatus}
        accounts={walletAccounts}
      />
      <TitleAccount
        currentAccountAddress={currentAccountAddress}
        onPress={() => setModalStatus(true)}
      />
      <AccountDetails
        currentAccountAddress={currentAccountAddress}
        currentAccountKey={currentAccountKey}
        balance={balance}
      />
      <TransactionList
        transactionList={transactionsList}
        transactionCount={transactionCount}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
