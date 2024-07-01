import React, { ReactNode } from "react";
import { Text, StyleSheet, Platform, TextStyle } from "react-native";
interface AppTextProps {
  children: ReactNode;
  style?: TextStyle;
}
const AppText: React.FC<AppTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
