import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createAccounts } from "../ethereum/utils";
import { ethers } from "ethers";
import PrimaryButton from "../ui/PrimaryButton";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import {
  setCurrentAccountAddress,
  setCurrentAccountKey,
  setAccounts,
} from "../store/walletBTSlice";
import LoginRecoveryModal from "../ui/LoginRecoveryModal";

const instructions = [
  "You are responsible for the safety of your wallet.",
  "The walletBT does not store any information remotely, everything will be stored in your phone.",
  "Store the passphrase securely when you create account for the first time.",
  "Passphrase can be used to login or restore your account.",
  "If passphrase is lost, walletBT can not recover your account.",
  "walletBT is not responsible if you lose fund due to your own actions of negligence and compromise of your device.",
  "Only proceed further if you understood the above information.",
];

function CreateAccount({ navigation }) {
  const [accountStatus, setAccountStatus] = useState(false);
  const dispatch = useDispatch();
  const [modalStatus, setModalStatus] = useState(false);
  const [mnemonicPhrase, setMnemonicPhrase] = useState(null);
  const [recoveryMode, setRecoveryMode] = useState(false);

  function walletBT() {
    try {
      let passphrase;
      //Conditionally setting the mnemonicPhrase for account recovery and new account creation
      if (recoveryMode) {
        passphrase = mnemonicPhrase;
      } else {
        passphrase = ethers.Wallet.createRandom().mnemonic.phrase;
      }
      Alert.alert(
        !recoveryMode
          ? "Wallet Creation | Write down the Passphrase"
          : "Wallet Recovery",
        passphrase + "\n\nClick OK to proceed and CANCEL to Exit",
        [
          {
            text: "Cancel",
            onPress: () => setAccountStatus(false),
          },
          {
            text: "Ok",
            onPress: async () => {
              const accounts = createAccounts(passphrase);
              // To make sure that the setAccountStatus is only called
              // upon the successful execution of the storeWallet() function
              try {
                await storeWallet(accounts);
                dispatch(setAccounts(accounts));
                dispatch(setCurrentAccountAddress(accounts[0].account));
                dispatch(setCurrentAccountKey(accounts[0].key));
                setAccountStatus(false);
                navigation.replace("SecondaryNavigator");
              } catch (error) {
                Alert.alert(
                  !recoveryMode ? "Wallet Creation" : "Wallet Recovey",
                  !recoveryMode
                    ? "Sorry, the wallet creation failed"
                    : "Sorry, could not recover the wallet",
                  [
                    {
                      text: "Ok",
                      onPress: () => setAccountStatus(false),
                    },
                  ]
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        !recoveryMode ? "Wallet Creation" : "Wallet Recovery",
        !recoveryMode
          ? "Sorry, the wallet creation failed"
          : "Sorry, could not recover the wallet",
        [
          {
            text: "Ok",
            onPress: () => setAccountStatus(false),
          },
        ]
      );
    }
  }
  async function storeWallet(walletBT) {
    try {
      await SecureStore.setItemAsync("walletBT", JSON.stringify(walletBT));
    } catch (error) {
      Alert.alert("Wallet Local Storage", "Ooops...could not save the wallet", [
        {
          text: "OK",
        },
      ]);
    }
  }
  useEffect(() => {
    if (accountStatus) {
      walletBT();
    }
  }, [accountStatus]);

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome to walletBT</Text>
        {accountStatus ? (
          <View style={styles.loadingStatus}>
            <ActivityIndicator size={100} />
            <Text style={styles.loadingStatusText}>
              {!recoveryMode
                ? "Wait a Second...Creating Wallet for You"
                : "Wait a Second...Recovering your wallet"}
            </Text>
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <Text>
                Read all the {instructions.length} instructions before you
                create your account and use it.
              </Text>
            )}
            data={instructions}
            renderItem={({ item, index }) => (
              <Text style={styles.instructions}>
                {index + 1}. {item}
              </Text>
            )}
            keyExtractor={(item) => item}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          onPress={() => {
            setAccountStatus(true);
          }}
        >
          Create Account
        </PrimaryButton>
        <PrimaryButton
          onPress={() => {
            setModalStatus(true);
            setRecoveryMode(true);
          }}
        >
          Recover Wallet
        </PrimaryButton>
      </View>
      <LoginRecoveryModal
        visible={modalStatus}
        setModalStatus={setModalStatus}
        setMnemonicPhrase={setMnemonicPhrase}
        setAccountStatus={setAccountStatus}
      />
    </>
  );
}

export default CreateAccount;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
  },
  bottomContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  instructions: {
    padding: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
  },
  loadingStatus: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  loadingStatusText: {
    textAlign: "center",
    fontSize: 18,
  },
});
