import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import SecondaryNavigator from "./SecondaryNavigator";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAccounts,
  setCurrentAccountAddress,
  setCurrentAccountKey,
} from "../store/walletBTSlice";

const Stack = createNativeStackNavigator();
function PrimaryNavigator() {
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = useState(null);

  async function getwaletBT() {
    try {
      const walletBT = await SecureStore.getItemAsync("walletBT");
      const accounts = JSON.parse(walletBT);
      setCurrentAddress(accounts[0].account);
      dispatch(setAccounts(accounts));
      dispatch(setCurrentAccountAddress(accounts[0].account));
      dispatch(setCurrentAccountKey(accounts[0].key));
    } catch {
      console.log("Could not fetch the data from local storage");
    }
  }

  useEffect(() => {
    getwaletBT();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!currentAddress ? (
        <>
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen
            name="SecondaryNavigator"
            component={SecondaryNavigator}
          />
        </>
      ) : (
        <Stack.Screen
          name="SecondaryNavigator"
          component={SecondaryNavigator}
        />
      )}
    </Stack.Navigator>
  );
}

export default PrimaryNavigator;
