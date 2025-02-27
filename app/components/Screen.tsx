import React, { ReactNode } from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ViewStyle } from "react-native";
interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
}
const Screen: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
