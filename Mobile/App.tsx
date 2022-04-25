import { SafeAreaProvider } from "react-native-safe-area-context";

import { BackHandler } from "react-native";
import React from "react";
import FlashMessage from "react-native-flash-message";
import Navigation from "./Src/navigation";

export default function App() {
  BackHandler.addEventListener("hardwareBackPress", () => {
    return true;
  });
  return (
    <SafeAreaProvider>
      <Navigation />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}
