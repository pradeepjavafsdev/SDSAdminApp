import { ref, push, update, onValue, remove } from "firebase/database";
// Import the initialized database instance
import { database } from "./firebase";

// Function to push a new order to the database
export interface UserResponse {
  docKey: string;
  partyDate: string;
  guests: number;
  selectedDishes: string[];
  needCook: boolean;
  needServicePerson: boolean;
  name: string;
  phone: string;
  vegGuests: number;
  nonVegGuests: number;
}
export const pushOrderToDatabase = (userResponse: UserResponse) => {
  const ordersRef = ref(database, "orders"); // Use the initialized 'database'

  return push(ordersRef, {
    partyDate: userResponse.partyDate,
    guests: userResponse.guests,
    selectedDishes: userResponse.selectedDishes,
    needCook: userResponse.needCook,
    needServicePerson: userResponse.needServicePerson,
    name: userResponse.name,
    phone: userResponse.phone,
    status: "Pending",
  })
    .then(() => {
      console.log("Order has been successfully saved.");
    })
    .catch((error) => {
      console.error("Error saving order:", error);
      throw error;
    });
};

// Function to update an existing order's status
export const updateOrderStatus = (orderId: string, newStatus: string) => {
  const orderRef = ref(database, `orders/${orderId}`); // Use the initialized 'database'

  return update(orderRef, { status: newStatus })
    .then(() => {
      console.log("Order status updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating order status:", error);
      throw error;
    });
};

// Function to fetch all orders from the database
export const fetchOrders = (callback: (data: UserResponse[]) => void) => {
  const ordersRef = ref(database, "orders");

  onValue(ordersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Transform data into an array with document keys
      const ordersArray = Object.keys(data).map((key) => ({
        docKey: key, // Include the document key
        ...data[key],
      }));

      callback(ordersArray);
    } else {
      console.log("No orders found.");
      callback([]);
    }
  });
};

// Function to delete an order
export const deleteOrder = (orderId: string) => {
  const orderRef = ref(database, `orders/${orderId}`); // Use the initialized 'database'

  return remove(orderRef)
    .then(() => {
      console.log("Order deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting order:", error);
      throw error;
    });
};
