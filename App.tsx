import React from "react";
import OrderListings from "./app/screens/OrderListings";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OrderListings></OrderListings>
    </GestureHandlerRootView>
  );
}
