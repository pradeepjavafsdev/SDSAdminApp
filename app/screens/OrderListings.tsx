import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Screen from "../components/Screen";
import OrderListItem from "../components/OrderListItem";
import { deleteOrder, fetchOrders, UserResponse } from "../orderDb";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { BlurView } from "expo-blur"; // Import expo-blur
import { Audio } from "expo-av"; // Import expo-av for sound
import { Alert } from "react-native";
const OrderListings: React.FC = () => {
  const [orders, setOrders] = useState<UserResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<UserResponse | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Function to load the sound
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/notification.mp3") // Ensure you have a sound file in this path
    );
    setSound(sound);
  };

  // Play sound and vibration when new order is added
  const handleData = (data: UserResponse[]) => {
    const ordersArray = Object.values(data);
    setOrders(ordersArray);

    // Trigger sound and vibration when new orders arrive
    if (ordersArray.length > orders.length) {
      playNotification();
    }
  };

  // Function to play sound and trigger vibration
  const playNotification = () => {
    if (sound) {
      sound.playAsync(); // Play the notification sound
    }
    Vibration.vibrate([0, 500, 200, 500]); // Vibration pattern [start, vibrate for 500ms, pause for 200ms, vibrate for 500ms]
  };

  const handleOrderPress = (order: UserResponse) => {
    setSelectedOrder(order); // Set the selected order to show in the modal
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal by setting selectedOrder to null
  };

  useEffect(() => {
    loadSound(); // Load the sound when the component mounts
    fetchOrders(handleData);
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.headerTitle}>Orders</AppText>
      </View>

      {orders.length == 0 ? (
        <View style={styles.container}>
          <AppText style={styles.noOrdersText}>No Orders</AppText>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.docKey}
          renderItem={({ item }) => (
            <OrderListItem
              orderNo={item.docKey}
              GuestName={item.name}
              mobileNo={item.phone}
              orderDetails={`Guests: ${item.guests}, Date: ${item.partyDate}`}
              onPress={() => handleOrderPress(item)} // Handle order press
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal for order details */}
      <Modal
        visible={!!selectedOrder}
        transparent={true}
        animationType="fade" // Using "fade" instead of "slide"
        onRequestClose={handleCloseModal} // Android back button handling
      >
        <BlurView
          style={styles.modalOverlay}
          intensity={50} // Adjust the blur intensity (0-100)
          tint="dark" // Tint the blur background to dark
        >
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <AppText style={styles.modalTitle}>
                  {selectedOrder.name}
                </AppText>
                <AppText>Mobile No: {selectedOrder.phone}</AppText>
                <AppText>Guests: {selectedOrder.guests}</AppText>
                <AppText>Veg Guests: {selectedOrder.vegGuests}</AppText>
                <AppText>Non-Veg Guests: {selectedOrder.nonVegGuests}</AppText>
                <AppText>Date: {selectedOrder.partyDate}</AppText>
                <AppText>
                  Selected Dishes: {selectedOrder.selectedDishes.join(", ")}
                </AppText>
                <AppText>
                  Cook Needed: {selectedOrder.needCook ? "Yes" : "No"}
                </AppText>
                <AppText>
                  Service Person Needed:{" "}
                  {selectedOrder.needServicePerson ? "Yes" : "No"}
                </AppText>

                {/* Close Button */}
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                >
                  <AppText style={styles.closeButtonText}>Close</AppText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </BlurView>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  totalOrders: {
    fontSize: 14,
    color: colors.white,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  noOrdersText: {
    fontSize: 20,
    color: colors.medium,
    fontWeight: "bold",
  },
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
});

export default OrderListings;
