import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import TitleAccount from "../ui/TitleAccount";
import AccountModal from "../ui/AccountModal";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { getBalance, sendTransaction } from "../ethereum/utils";
import { useFocusEffect } from "@react-navigation/native";
import { INFURA_SEPOLIA_API } from "@env";

function Send() {
  const [modalStatus, setModalStatus] = useState(false);
  const [amount, setAmount] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentAccountAddress = useSelector(
    (state) => state.walletBT.currentAccountAddress
  );
  const currentAccountKey = useSelector(
    (state) => state.walletBT.currentAccountKey
  );
  const walletAccounts = useSelector((state) => state.walletBT.accounts);

  useFocusEffect(
    React.useCallback(() => {
      if (currentAccountAddress) {
        getBalance(currentAccountAddress, INFURA_SEPOLIA_API)
          .then((balance) => setBalance(balance))
          .catch((e) => alert("Could not fetch the balance"));
      }
      // If this is what you want, sometimes you might want to save it
      setAmount("");
      setRecipientAddress("");
    }, [currentAccountAddress])
  );
  function handleOnSend() {
    setIsLoading(true);
    sendTransaction(
      amount,
      INFURA_SEPOLIA_API,
      currentAccountKey,
      recipientAddress
    )
      .then((txn) => {
        setIsLoading(false);
        if (txn.status) {
          Alert.alert(
            "Transaction Detail",
            `Transaction successfull with hash ${txn.transactionHash}`,
            [
              {
                text: "OK",
                onPress: () => {
                  setAmount("");
                  setRecipientAddress("");
                },
              },
            ]
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Could not process the transaction\nTry later on");
      });
  }

  return (
    <View
      style={{
        ...styles.rootContainer,
        backgroundColor: isLoading ? "#9ea9b5" : null,
      }}
    >
      <TitleAccount
        currentAccountAddress={currentAccountAddress}
        onPress={() => setModalStatus(true)}
      />
      <AccountModal
        accounts={walletAccounts}
        visible={modalStatus}
        setModalStatus={setModalStatus}
      />
      <View style={styles.secondaryContainer}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          placeholder="Enter address"
          multiline={true}
          value={recipientAddress}
          style={styles.input}
          onChangeText={(enteredAddress) => setRecipientAddress(enteredAddress)}
        />
        <Text style={styles.label}>Enter Amount</Text>
        {amount > balance ? (
          <Text style={styles.warning}>
            Oops... Insufficient Balance {balance}
          </Text>
        ) : null}
        <TextInput
          placeholder="Enter amount in ether"
          value={amount}
          style={{ ...styles.input, alignSelf: "center" }}
          keyboardType="number-pad"
          onChangeText={(enteredAmount) => setAmount(enteredAmount)}
        />
        <PrimaryButton onPress={handleOnSend}>
          Send {amount ? amount : null} Ether(s)
        </PrimaryButton>
      </View>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={100} color="#ff6720" />
        </View>
      ) : null}
    </View>
  );
}

export default Send;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  secondaryContainer: {
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
  warning: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 10,
  },
  activityIndicator: {
    position: "absolute",
    zIndex: 1,
    left: "50%",
    top: "50%",
    marginTop: -50, //Half of the activity indicator size
    marginLeft: -50, //Half of the activity indicator size
  },
});
