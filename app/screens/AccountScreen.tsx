import React from "react";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
const AccountScreen: React.FC = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <ListItem
          title="Pradeep Sahoo"
          subTitle="Pradeepksahoo@gmail.com"
          image={require("../assets/avtar.jpeg")}
        ></ListItem>
      </View>
      <View style={styles.container}>
        <ListItem
          title="My Orders"
          image={require("../assets/avtar.jpeg")}
        ></ListItem>
      </View>
      <View style={styles.container}>
        <ListItem
          title="My Orders"
          image={require("../assets/avtar.jpeg")}
        ></ListItem>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    color: "red",
  },
});
export default AccountScreen;
