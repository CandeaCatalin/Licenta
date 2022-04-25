import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./Linking";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { UserProvider } from "../context/UserContext";
import { QueueProvider } from "../context/QueueContext";
import { BackHandler, View } from "react-native";
import { Queue } from "../screens/Queue";
import { PhysicalQueueProvider } from "../context/PhysicalQueueContext";
import { useEffect } from "react";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  return (
    <QueueProvider>
      <UserProvider>
        <PhysicalQueueProvider>
          <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Queue" component={Queue} />
          </Stack.Navigator>
        </PhysicalQueueProvider>
      </UserProvider>
    </QueueProvider>
  );
}
