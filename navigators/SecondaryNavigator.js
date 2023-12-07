import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Send from "../screens/Send";
import Transactions from "../screens/Transactions";

const Tab = createBottomTabNavigator();

function SecondaryNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Send"
        component={Send}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="send" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default SecondaryNavigator;
