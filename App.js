import "react-native-get-random-values";
import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, StatusBar as SB } from "react-native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import PrimaryNavigator from "./navigators/PrimaryNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#ff6720" />
      <Provider store={store}>
        <NavigationContainer>
          <PrimaryNavigator />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SB.currentHeight,
  },
});
