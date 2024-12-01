import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert,
} from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../config/colors";
import { deleteOrder } from "../orderDb"; // Import deleteOrder function

interface ListItemProps {
  orderNo: string;
  GuestName: string;
  mobileNo: string;
  orderDetails: string;
  onPress?: () => void;
  renderRightActions?: () => React.ReactNode;
}

const OrderListItem: React.FC<ListItemProps> = ({
  orderNo,
  GuestName,
  mobileNo,
  orderDetails,
  onPress,
  renderRightActions,
}) => {
  // Handle delete action
  const handleDelete = () => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteOrder(orderNo)
              .then(() => {
                console.log("Order deleted successfully!");
              })
              .catch((error) => {
                console.error("Error deleting order:", error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Swipeable right action for delete
  const renderDeleteAction = () => (
    <TouchableHighlight style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableHighlight>
  );

  return (
    <Swipeable renderRightActions={renderDeleteAction}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{GuestName}</AppText>
            <AppText style={styles.subTitle}>{mobileNo}</AppText>
            <AppText style={styles.orderDetails}>{orderDetails}</AppText>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
  },
  subTitle: {
    color: colors.medium,
    fontSize: 14,
    marginVertical: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary,
  },
  orderDetails: {
    color: colors.dark,
    fontSize: 16,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger, // Red for delete
    height: "100%",
    width: 100,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderListItem;
